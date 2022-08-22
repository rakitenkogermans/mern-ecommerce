const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envVars) => {
    const {env, analyze} = envVars;
    const bundleAnalyzer = analyze ? require('./webpack.analyze.js') : {};
    const envConfig = require(`./webpack.${env}.js`);
    return merge(commonConfig, envConfig, bundleAnalyzer);
}
