const Dotenv = require("dotenv-webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '../.env.production'),
            systemvars: true
        }),
    ],
    mode: "production",
    devtool: "source-map",
}
