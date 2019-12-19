module.exports = {
  root: true,

  env: {
    node: true,
    jquery: true,
  },

  extends: ['plugin:vue/essential', '@vue/airbnb'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': ['error', {allow: ['__typename']}],
    'max-len': ['error', {code: 120}],
    //do not use this rule since it'll conflict with prettier formatting
    //https://github.com/prettier/prettier-eslint/issues/186
    'operator-linebreak': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'acc',
          'e',
          'ctx',
          'req',
          'request',
          'res',
          'response',
          '$scope',
        ],
      },
    ],

    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
        schemaJson: require('./graphql.schema.json'),
      },
    ],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  plugins: ['graphql'],
};
