const { merge } = require('webpack-merge');
const getWebpackConfig = require('@nrwl/react/plugins/webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (config) => {
  const nxConfig = getWebpackConfig(config);
  return merge(nxConfig, { plugins: [new NodePolyfillPlugin()] });
};
