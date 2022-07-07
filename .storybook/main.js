module.exports = {
  core: { builder: 'webpack5' },

  stories: [
    '../apps/**/*.stories.mdx',
    '../apps/**/*.stories.@(js|jsx|ts|tsx)',
    '../apps/**/stories.@(js|jsx|ts|tsx)',
    '../libs/**/*.stories.mdx',
    '../libs/**/*.stories.@(js|jsx|ts|tsx)',
    '../libs/**/stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@nrwl/react/plugins/storybook'],
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
