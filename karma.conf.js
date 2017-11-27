/*eslint-env node*/

import makeWebpackConfig from './webpack.make';

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised'],
    client: {mocha: {timeout: 5000}},
    files: ['spec.js'],
    preprocessors: {'spec.js': ['webpack']},
    webpack: makeWebpackConfig({TEST: true}),
    webpackMiddleware: {noInfo: true},
    coverageReporter: {
      reporters: [
        {type: 'html', subdir: 'client'},
        {type: 'json', subdir: '.', file: 'client-coverage.json'}
      ],
      dir: 'coverage/'
    },
    logLevel: config.LOG_INFO,
    reporters: ['spec', 'coverage'],
    browsers: ['ChromeHeadless'],
  });
};
