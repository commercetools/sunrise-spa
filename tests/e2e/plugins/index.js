const webpack = require('@cypress/webpack-preprocessor');
//sometimes this is needed when running cypress locally
//  sometimes it isn't but don't push this because
//  circleci does not need this
// require('dotenv').config({
//   path: __dirname + '/../../../.env.local',
// });
require('dotenv').config();
// https://docs.cypress.io/guides/guides/plugins-guide.html
module.exports = (on, config) => {
  on('file:preprocessor', webpack());
  return {
    ...config,
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
    env: process.env,
  };
};
