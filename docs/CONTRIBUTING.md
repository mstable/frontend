# How to Contribute to Frontend

Thank you for contributing to this repository! 👏

## Git conventions

### Commits

We use conventional commits and follow semantic versioning for our release process. Please ensure that your commit messages follow the format below:

```text
<type>: <subject>

<optional body>

<optional footer(s)>
```

The message consists of a header, a body, and a footer. The header has a special format that includes a type and a subject. The body and footer are optional.


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

The subject contains a brief description of the change. Use the imperative mood, present tense, and do not capitalize the first letter or use a period at the end.

#### Body

The body is optional and should provide more detail about the change. Use the same imperative mood and present tense as in the subject.

#### Footer

The footer is optional and should be used to provide any additional information, such as breaking changes. If there are breaking changes, start the footer with the phrase `BREAKING CHANGE:` followed by a description of the changes.

Please note that each line of the commit message cannot be longer than 100 characters.

For more information, refer to [AngularJS Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
