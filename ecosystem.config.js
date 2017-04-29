module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'MyPress',
            script: 'src/server/index.js',
            env: {
                TZ: 'UTC'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'tony',
            host: '',
            ref: 'origin/master',
            repo: 'git@github.com:starlightslo/mypress.git',
            path: '/home/tony/production/mypress',
            'post-deploy': 'yarn install && pm2 reload ecosystem.config.js --env production'
        },
        dev: {
            user: 'tony',
            host: '127.0.0.1',
            ref: 'origin/develop',
            repo: 'git@github.com:starlightslo/mypress.git',
            path: '/home/tony/develop/mypress',
            'post-deploy': 'yarn install && pm2 reload ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'dev'
            }
        }
    }
};
