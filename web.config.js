const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        path.join(__dirname, './src/client/jsx/index.js')
    ],
    output: {
        path: path.join(__dirname, './out/client/public/js/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            // take all less files, compile them, and bundle them in with our js bundle
            { test: /\.less$/, loader: 'style!css!autoprefixer?browsers=last 2 version!less' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-3']
                }
            }
        ]
    },
    watch: false
};
