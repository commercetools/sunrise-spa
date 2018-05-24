module.exports = {
  root: true,

  env: {
    node: true,
    jquery: true
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [
      'error', { 'code': 120 }
    ]

    // 'graphql/template-strings': [
    //   'error',
    //   {
    //     env: 'literal'
    //   }
    // ]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  plugins: [
    'graphql'
  ]
}