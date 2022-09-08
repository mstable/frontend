module.exports = {
  schema:
    'https://api.studio.thegraph.com/query/32034/mstable-metavault-goerli/v0.1.0',
  documents: ['**/src/**/*.graphql'],
  generates: {
    'libs/shared/data-access/src/generated/graphql.ts': {
      plugins: ['typescript'],
    },
    '**/src': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '~@frontend/shared-data-access',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: {
          func: '@frontend/shared-data-access#graphqlClient',
        },
      },
    },
  },
};
