module.exports = {
  globals: {
    'ts-jest': {
      enableTsDiagnostics: true,
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: `tests/.*\.test\.ts$`,
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  verbose: false,
  coverageReporters: ['json', 'lcov'],
  // globalSetup: './tests/_setup.js',
};
