module.exports = {
    collectCoverageFrom:['src/**/*.js'],
    coverageReporters:['json', 'lcov', 'text', 'text-summary'],
    testMatch:[
        '<rootDir>/src/**/__tests__/**/*.js',
        '<rootDir>/src/**/?(*.)(spec|test).js',
    ],
    testEnvironment:'node',
    testURL: 'http://localhost',
  setupTestFrameworkScriptFile: '<rootDir>/jestSetup.js',
  coveragePathIgnorePatterns: ['/__fixtures__/'],
  notify: true,
  modulePathIgnorePatterns: ['node_modules'],
}