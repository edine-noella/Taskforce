module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['airbnb-base', 'prettier'],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      camelcase: 'off',
      'import/extensions': [0, 'never' || 'always' || 'ignorePackages'],
      'consistent-return': 0,
    },
  };
  