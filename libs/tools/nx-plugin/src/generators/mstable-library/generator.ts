import {
  formatFiles,
  getWorkspaceLayout,
  installPackagesTask,
  joinPathFragments,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { libraryGenerator } from '@nrwl/react/src/generators/library/library';

import type { Tree } from '@nrwl/devkit';
import type { NormalizedSchema } from '@nrwl/react/src/generators/library/library';
import type { Schema } from '@nrwl/react/src/generators/library/schema';

const defaultSchema: Omit<Schema, 'name' | 'directory'> = {
  buildable: true,
  compiler: 'babel',
  component: false,
  globalCss: false,
  js: false,
  linter: Linter.EsLint,
  pascalCaseFiles: true,
  publishable: true,
  routing: false,
  setParserOptionsProject: false,
  skipFormat: false,
  skipTsConfig: false,
  standaloneConfig: true,
  strict: false,
  style: '@emotion/styled',
  unitTestRunner: 'none',
};

const getImportPath = (tree: Tree, options: Schema) => {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;

  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const { npmScope } = getWorkspaceLayout(tree);

  return `@${npmScope}/${projectName}`;
};

const normalizeOptions = (tree: Tree, options: Schema): NormalizedSchema => {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;

  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const { libsDir } = getWorkspaceLayout(tree);
  const projectRoot = joinPathFragments(libsDir, projectDirectory);

  const normalized: NormalizedSchema = {
    ...options,
    fileName: projectName,
    name: projectName,
    parsedTags: [],
    projectDirectory,
    projectRoot,
    routePath: `/${name}`,
  };

  return normalized;
};

const updateProject = (tree: Tree, options: NormalizedSchema) => {
  const projectConfig = readProjectConfiguration(tree, options.name);
  const projectRootKebabCase = options.projectRoot.replace(/\//g, '-');

  projectConfig.targets['build'].options.rollupConfig = 'rollup.config.js';

  projectConfig.targets['i18n-extract'] = {
    executor: 'nx:run-commands',
    options: {
      commands: [
        `yarn run formatjs extract '${options.projectRoot}/**/*.{ts,tsx}' --out-file i18n-extractions/${projectRootKebabCase}.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'`,
      ],
    },
  };

  updateProjectConfiguration(tree, options.name, projectConfig);
};

const updateTsConfig = (tree: Tree, options: NormalizedSchema) => {
  const offset = offsetFromRoot(options.projectRoot);

  updateJson(
    tree,
    joinPathFragments(options.projectRoot, 'tsconfig.json'),
    (json) => {
      json.compilerOptions = {
        allowJs: true,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        jsx: 'react-jsx',
        jsxImportSource: '@emotion/react',
        noFallthroughCasesInSwitch: true,
        noImplicitOverride: true,
        noImplicitReturns: true,
        noPropertyAccessFromIndexSignature: true,
        resolveJsonModule: true,
        strict: false,
      };

      return json;
    },
  );

  updateJson(
    tree,
    joinPathFragments(options.projectRoot, 'tsconfig.lib.json'),
    (json) => {
      json.files = [
        ...json.files,
        `${offset}dist/libs/shared/theme/src/mui/types.d.ts`,
      ];

      return json;
    },
  );
};

export const customLibraryGenerator = async (tree: Tree, schema: Schema) => {
  const importPath = getImportPath(tree, schema);
  const initOptions = { ...schema, ...defaultSchema, importPath };
  const options = normalizeOptions(tree, initOptions);

  await libraryGenerator(tree, initOptions);

  // Update [lib root]/tsconfig.json
  updateTsConfig(tree, options);

  // Update [lib root]/project.json
  updateProject(tree, options);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
};

export default customLibraryGenerator;
