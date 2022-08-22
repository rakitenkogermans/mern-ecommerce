const Dotenv = require("dotenv-webpack");
const path = require("path");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: "development",
    devServer: {
        hot: true,
        open: true,
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname,'../.env.development')
        }),
        new ReactRefreshWebpackPlugin(),
    ],
}
