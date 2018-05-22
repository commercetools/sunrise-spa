module.exports = {
  root: true,

  env: {
    node: true
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

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