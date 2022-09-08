module.exports = {
  generates: {
    'libs/shared/data-access/src/generated/graphql.ts': {
      schema:
        'https://api.studio.thegraph.com/query/32034/mstable-metavault-goerli/v0.1.0',
      documents: ['**/src/**/*.graphql'],
      plugins: ['typescript'],
    },
    '**/src': {
      schema:
        'https://api.studio.thegraph.com/query/32034/mstable-metavault-goerli/v0.1.0',
      documents: ['**/src/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '~@frontend/shared-data-access',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
    },
  },
};
