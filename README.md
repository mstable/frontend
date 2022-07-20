<p style="text-align: center;"><img src="https://raw.githubusercontent.com/mstable/mStable-apps/master/libs/icons/src/lib/mstable.svg" width="450"></p>

# mStable Frontend

This is the monorepo holding code for latest frontend applications of mStable

## Quickstart

### Clone repository

```bash
git clone https://github.com/mstable/frontend.git
cd frontend
```

### Install dependencies

```bash
yarn
```

### Run main app

```bash
yarn start
```

> By default the app is accessible on [http://localhost:4200](http://localhost:4200)

### Run storybook

```bash
yarn storybook
```

> By default the storybook is accessible on [http://localhost:6006](http://localhost:6006)

## Scripts

- **start**: serves default application (mStable)
- **build**: builds default application (mStable)
- **test**: run unit tests
- **prepare**: setup husky for git hooks
- **i18n:extract**": extract all translation strings to `i18n-extractions` folder
- **i18n:compile**": compiles all translation for mStable application
- **storybook**: serves storybook
- **storybook:build**: builds storybook
- **lint**: runs lint over the repo
- **lint:fix**: fixes lint over the repo

## Developing

Follow the [Developing Guide](./DEVELOPING.md) for detailed instructions and information regarding local development!

## Contributing

Follow the [Contributing Guide](./CONTRIBUTING.md) for information regarding contribution guidelines!
