/* eslint-disable no-undef */
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
  })
);
