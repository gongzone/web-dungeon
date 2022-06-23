const { off } = require('process')

module.exports = {
  // Configuration for JavaScript files
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo',
  ],
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint', 'unused-imports'],
      extends: [
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        'prefer-destructuring': 'off',
        'import/extensions': 'off',
        'react/prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/react-in-jsx-scope': 'off',
        // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        'jsx-a11y/anchor-is-valid': 'off',
        // Next.js use his own internal link system
        'react/require-default-props': 'off',
        // Allow non-defined react props as undefined
        'react/jsx-props-no-spreading': 'off',
        // _app.tsx uses spread operator and also, react-hook-form
        'react-hooks/exhaustive-deps': 'off',
        // We currently not using next/image because it isn't supported with SSG mode
        '@typescript-eslint/comma-dangle': 'off',
        // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'error',
        // Ensure `import type` is used when it's necessary
        'import/prefer-default-export': 'off',
        // Named export is easier to refactor automatically
        'import/no-extraneous-dependencies': 'off',
        // Export configuration for `eslint-plugin-simple-import-sort`
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
      },
    }, // Configuration for testing
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      plugins: ['jest', 'jest-formatting', 'testing-library', 'jest-dom'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-formatting/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
      ],
    },
  ],
}
