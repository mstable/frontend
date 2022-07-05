const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup');
const getRollupOptions = require('@nrwl/react/plugins/bundle-rollup');

module.exports = (options) => {
  const { plugins, ...nxOptions } = getRollupOptions(options);
  return {
    ...nxOptions,
    plugins: [...plugins, url(), svgr()],
  };
};
