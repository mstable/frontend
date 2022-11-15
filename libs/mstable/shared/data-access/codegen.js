module.exports = {
  generates: {
    'libs/mstable/shared/data-access/src/generated/graphql.ts': {
      schema: process.env['NX_THE_GRAPH_MV_MAINNET_URL'],
      documents: ['**/src/**/*.graphql'],
      plugins: ['typescript'],
    },
    'libs/mstable/**/src': {
      schema: process.env['NX_THE_GRAPH_MV_MAINNET_URL'],
      documents: ['**/src/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '~@frontend/mstable-shared-data-access',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
    },
  },
};
