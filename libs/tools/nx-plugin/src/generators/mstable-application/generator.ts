import {
  formatFiles,
  installPackagesTask,
  joinPathFragments,
  offsetFromRoot,
  readProjectConfiguration,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { applicationGenerator } from '@nrwl/react/src/generators/application/application';
import { normalizeOptions } from '@nrwl/react/src/generators/application/lib/normalize-options';

import type { Tree } from '@nrwl/devkit';
import type {
  NormalizedSchema,
  Schema,
} from '@nrwl/react/src/generators/application/schema';

const defaultSchema: Omit<Schema, 'name' | 'directory'> = {
  classComponent: false,
  bundler: 'vite',
  e2eTestRunner: 'none',
  globalCss: false,
  js: false,
  linter: Linter.EsLint,
  pascalCaseFiles: true,
  routing: false,
  setParserOptionsProject: false,
  skipFormat: false,
  skipWorkspaceJson: false,
  standaloneConfig: true,
  strict: false,
  style: '@emotion/styled',
  unitTestRunner: 'none',
};

const updateProject = (tree: Tree, options: NormalizedSchema) => {
  const projectConfig = readProjectConfiguration(tree, options.projectName);
  const appProjectRootKebabCase = options.appProjectRoot.replace(/\//g, '-');

  projectConfig.targets['build'].options.dependsOn = ['^build', 'i18n-compile'];

  projectConfig.targets['i18n-extract'] = {
    executor: 'nx:run-commands',
    options: {
      commands: [
        `yarn run formatjs extract '${options.appProjectRoot}/src/**/*.{ts,tsx}' --out-file i18n-extractions/${appProjectRootKebabCase}.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'`,
      ],
    },
  };

  projectConfig.targets['i18n-clear'] = {
    executor: 'nx:run-commands',
    options: {
      commands: ['yarn rimraf i18n-extractions'],
    },
  };

  projectConfig.targets['i18n-compile'] = {
    executor: 'nx:run-commands',
    dependsOn: ['i18n-clear', 'i18n-extract', '^i18n-extract'],
    options: {
      commands: [
        `jq -rs 'reduce .[] as $item ({}; . * $item)' i18n-extractions/* > ${options.appProjectRoot}/i18n/en.json`,
        `yarn run formatjs compile ${options.appProjectRoot}/i18n/en.json --ast --out-file ${options.appProjectRoot}/src/assets/lang/en.json`,
        `yarn run nx format:write --files ${options.appProjectRoot}/src/assets/lang/*.json`,
      ],
      parallel: false,
    },
  };

  updateProjectConfiguration(tree, options.projectName, projectConfig);
};

const updateTsConfigs = (tree: Tree, options: NormalizedSchema) => {
  const offset = offsetFromRoot(options.appProjectRoot);

  updateJson(
    tree,
    joinPathFragments(options.appProjectRoot, 'tsconfig.json'),
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
};

export const customApplicationGenerator = async (
  tree: Tree,
  schema: Schema,
) => {
  const initOptions = { ...schema, ...defaultSchema };
  const options = normalizeOptions(tree, initOptions);

  await applicationGenerator(tree, initOptions);

  // Update [app root]/tsconfig.json
  updateTsConfigs(tree, options);

  // Update [app root]/project.json
  updateProject(tree, options);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
};

export default customApplicationGenerator;
