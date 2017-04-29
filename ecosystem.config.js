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
                NODE_ENV: 'production',
                PORT: 9000
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
            repo: 'https://github.com/starlightslo/mypress.git',
            path: '/home/tony/production/mypress',
            'post-deploy': 'yarn install && yarn run build && yarn upgrade && yarn run migration-production && pm2 reload ecosystem.config.js --env production',
            ssh_options: 'StrictHostKeyChecking=no'
        },
        dev: {
            user: 'tony',
            host: '127.0.0.1',
            ref: 'origin/develop',
            repo: 'https://github.com/starlightslo/mypress.git',
            path: '/home/tony/develop/mypress',
            'post-deploy': 'yarn install && yarn run build && yarn upgrade && yarn run migration-dev && pm2 reload ecosystem.config.js --env dev',
            ssh_options: 'StrictHostKeyChecking=no',
            env: {
                NODE_ENV: 'dev',
                PORT: 9000
            }
        }
    }
};
