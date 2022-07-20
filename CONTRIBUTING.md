# How to Contribute to Frontend

Thank you for contributing to this repository 👏

## Git conventions

### Commits

The release process follows semantic versionning and use conventional commits rules to detect version bumps.

#### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type** and a **subject**. We will not be using a scope for this project.

```text
<type>: <subject>
<BLANK LINE>
<optional body>
<BLANK LINE>
<optional footer(s)>
```

> Any line of the commit message cannot be longer than 100 characters!
> This allows the message to be easier to read on GitHub as well as in various git tools.

#### Type

Must be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

#### Body (optional)

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer (optional)

The footer should contain any information about **Breaking Changes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

More information [here](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
