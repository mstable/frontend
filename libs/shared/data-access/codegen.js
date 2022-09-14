module.exports = {
  generates: {
    'libs/shared/data-access/src/generated/graphql.ts': {
      schema: process.env['NX_THE_GRAPH_MV_GOERLI_URL'],
      documents: ['**/src/**/*.graphql'],
      plugins: ['typescript'],
    },
    '**/src': {
      schema: process.env['NX_THE_GRAPH_MV_GOERLI_URL'],
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
