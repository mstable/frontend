const { merge } = require('webpack-merge');
const getWebpackConfig = require('@nrwl/react/plugins/webpack');

function customLoader() {
  const { transform } = require('@formatjs/ts-transformer');
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      getCustomTransformers() {
        return {
          before: [
            transform({
              ast: true,
              overrideIdFn: '[sha512:contenthash:base64:6]',
            }),
          ],
        };
      },
    },
  };
}

module.exports = (config) => {
  const nxConfig = getWebpackConfig(config);
  return merge(nxConfig, { module: { rules: [customLoader()] } });
};
