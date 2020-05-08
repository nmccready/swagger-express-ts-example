/*
SPECIFIC RULES, SETTINGS SHOULD only be to make custom things work like
configuration resolution, and extraneous dep (where it can't be injected (yet))

If your needing to add custom rules make a PRs to:
- @znemz/js-common-eslint-config-react
- @znemz/js-common-eslint-config
*/
module.exports = {
  extends: [require.resolve('@znemz/js-common-eslint-config')],
  rules: {
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-member-accessibility': 0, // TODO: look later
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ], // eslint has it's own good enough
    'no-empty': 0,
    'guard-for-in': 0,
    camelcase: 0, // TODO: for now, only mongo / db objects should allow fields like this
    'no-await-in-loop': 0,
    'import/no-cycle': 1,
    'import/no-self-import': 1,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,
    // https://github.com/benmosher/eslint-plugin-import/issues/458#issuecomment-468235671
    'import/no-extraneous-dependencies': (context) => [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: [context.getFilename(), __dirname],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      // TODO: fix if we ever get more time or reuse admin
      files: [
        '**/packages/site-admin/app/admin_controllers/*',
        '**/packages/site-admin/app/controllers/*',
      ],
      rules: {
        'prefer-const': 0,
        eqeqeq: 0,
        radix: 0,
        'no-unsed-vars': 0,
        'no-var': 0,
        'vars-on-top': 0,
        'block-scoped-var': 0,
        'no-shadow': 0,
        'max-len': 0,
      },
    },
  ],
};
