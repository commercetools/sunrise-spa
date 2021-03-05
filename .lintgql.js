const config = require('./.eslintrc.js');
config.rules['graphql/no-deprecated-fields'][1].env='literal';
module.exports = config;