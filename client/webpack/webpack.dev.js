const Dotenv = require('dotenv-webpack');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
        },
        hot: true,
        open: true,
        compress: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:9000',
            },
            '/uploads': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:9000',
            },
        },
        historyApiFallback: true,
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '../.env.development'),
        }),
        new ReactRefreshWebpackPlugin(),
    ],
};
