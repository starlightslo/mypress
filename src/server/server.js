const Path = require('path');
const Hapi = require('hapi');
const EJS = require('ejs');
const Bunyan = require('bunyan');

// Handler
const ResponseHandler = require('./config/handler/response-handler');

// Environment
const Environment = require('./app/enums/environment');

class Server {
    constructor(config) {
        this.config = config;

        // Hapi Server Config
        const hapiConfig = {
            connections: {
                routes: {
                    files: {
                        relativeTo: this.config.path.public
                    }
                }
            }
        };

        // Adding cache feature
        if (this.config.cache) {
            hapiConfig['cache'] = this.config.cache;
        }

        // Create Hapi server
        this.server = new Hapi.Server(hapiConfig);
        this.server.connection({
            port: this.config.port
        });

        // Set config into hapi server
        this.server.config = this.config;

        // Set view engines
        this.server.register(require('vision'), (err) => {
            this.server.views({
                engines: {
                    ejs: EJS
                },
                relativeTo: __dirname,
                path: '../client/views',
                layoutPath: '../client/views/layout',
                helpersPath: '../client/views/helpers'
            });
        });

        // Serving static file
        this.server.register(require('inert'), () => { });

        // Setting session
        if (this.config.session) {
            this.setSession(this.config.session);
        }

        // Set up hapi db manager if environment not on the production
        if (this.config.env !== Environment.PRODUCTION) {
            // Hapi DB Manager
            const dbManagerOptions = {
                managerPath: '/db',
                databaseConfigList: this.config.dbList
            };
            this.server.register([require('inert'), require('vision'), {
                register: require('hapi-db-manager'),
                options: dbManagerOptions
            }], (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    }

    self() {
        return this.server;
    }

    loadStrategies() {
        return new Promise((resolve, reject) => {
            const fs = require('fs');
            const path = require('path');
            fs.stat(path.join(this.config.root, this.config.path.strategy), (err, stats) => {
                if (!err) {
                    fs.readdirSync(path.join(this.config.root, this.config.path.strategy)).forEach((file) => {
                        if (file.endsWith('.js')) {
                            const strategy = require(this.config.path.strategy + '/' + file);
                            console.info('Loading ' + strategy.name + ' strategy...');
                            try {
                                stats = fs.statSync(path.join(this.config.root, this.config.path.strategy, strategy.plugin));
                                if (stats) {
                                    try {
                                        const plugin = require(this.config.path.strategy + '/' + strategy.plugin + '/' + strategy.plugin + '.js');
                                        this.addStrategy(plugin, strategy.isDefault, strategy.name, strategy.scheme, strategy.mode, strategy.options);
                                    } catch (e) {
                                        console.error('Load ' + strategy.name + ' failed: ', e);
                                    }
                                }
                            } catch (e) {
                                const plugin = require(strategy.plugin);
                                this.addStrategy(plugin, strategy.isDefault, strategy.name, strategy.scheme, strategy.mode, strategy.options);
                            }
                        }
                    });
                }
                resolve();
            });
        });
    }

    loadRoutes() {
        return new Promise((resolve, reject) => {
            const fs = require('fs');
            const path = require('path');
            fs.stat(path.join(this.config.root, this.config.path.routes), (err, stats) => {
                if (!err) {
                    fs.readdirSync(path.join(this.config.root, this.config.path.routes)).forEach((file) => {
                        if (file.endsWith('.js')) {
                            console.info('Loading ' + file + ' route...');
                            this.addPlugin(require(this.config.path.routes + '/' + file), {});
                        }
                    });
                }
                resolve();
            });
        });
    }

    loadPlugins() {
        return new Promise((resolve, reject) => {
            const fs = require('fs');
            const path = require('path');
            fs.stat(path.join(this.config.root, this.config.path.plugins), (err, stats) => {
                if (!err) {
                    fs.readdirSync(path.join(this.config.root, this.config.path.plugins)).forEach((file) => {
                        if (file.endsWith('.js')) {
                            const pluginName = require(this.config.path.plugins + '/' + file).name;
                            const pluginOptions = require(this.config.path.plugins + '/' + file).options;
                            try {
                                stats = fs.statSync(path.join(this.config.root, this.config.path.plugins, pluginName));
                                if (stats) {
                                    try {
                                        this.addPlugin(require(this.config.path.plugins + '/' + pluginName + '/' + pluginName + '.js'), pluginOptions);
                                    } catch (e) {
                                        console.error('Load ' + pluginName + ' failed: ', e);
                                    }
                                }
                            } catch (e) {
                                this.addPlugin(require(pluginName), pluginOptions);
                            }
                        }
                    });
                }
                resolve();
            });
        });
    }

    setLogger() {
        this.server.register({
            register: require('hapi-bunyan'),
            options: {
                logger: Bunyan.createLogger(this.config.logConfig)
            }
        }, (err) => {

        });
    }

    addStrategy(plugin, isDefault, name, scheme, mode, options) {
        this.server.register(plugin, (err) => {
            if (err) {
                console.error('Failed to load plugin:', err);
            } else {
                this.server.auth.strategy(name, scheme, mode, options);
            }
        });

        if (isDefault) {
            this.server.auth.default({
                strategy: name
            });
        }
    }

    addRoute(route) {
        this.server.route(route);
    }

    addPlugin(plugin, options) {
        this.server.register({
            register: plugin,
            options: options
        }, (err) => {
            if (err) {
                console.error('Failed to load plugin:', err);
            }
        });
    }

    setSession(session) {
        this.server.state('session', session);
    }

    setHandler() {
        this.server.r = ResponseHandler;
    }

    start() {
        return new Promise((resolve, reject) => {
            // Loading strategies
            this.loadStrategies().then(() => {
                // Loading plugins
                return this.loadPlugins();
            }).then(() => {
                // Loading routes
                return this.loadRoutes();
            }).then(() => {
                // Setup logger
                this.setLogger();

                // Setup handler
                this.setHandler();

                // Start server
                this.server.start((err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }
}

module.exports = Server;
