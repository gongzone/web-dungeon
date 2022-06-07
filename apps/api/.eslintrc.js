module.exports = {
  ...require('eslint-config/eslint-nest.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
