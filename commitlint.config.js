module.exports = { extends: ['@commitlint/config-conventional'] }

// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// chore: tool changes, configuration changes, and changes to things that do not actually go into production at all.
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// revert: for revert commits
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

/* <type>[optional scope]: <description>

[optional body]

[optional footer(s)] */
