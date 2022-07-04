// const { readdirSync: readDirectory } = require('fs');
// const DEFAULT_SCOPES = ['repo', '*', 'all'];
// const directories = ['./apps', './libs', './libs/shared'];

// const packageDirNames = directories.reduce(
//   (acc, curr) => [
//     ...acc,
//     ...readDirectory(curr, { withFileTypes: true })
//       .filter((entry) => entry.isDirectory())
//       .map((dir) => {
//         const prefix = curr.split('./')[1].replace(/\//g, '-');

//         return `${prefix}-${dir.name}`;
//       }),
//   ],
//   [],
// );

// const scopes = DEFAULT_SCOPES.concat(packageDirNames, 'test-utils', 'tools');

module.exports = {
  extends: ['@commitlint/config-conventional'/* , 'monorepo' */],
  // rules: {
  //   'scope-enum': [2, 'always', scopes],
  // },
};
