module.exports = {
  moduleFileExtensions: ['js'],
  testMatch: ['**/*.(test|spec).js'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage/jest', outputName: 'results.xml' }]],
  coveragePathIgnorePatterns: [
    'build',
    '/node_modules/',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  coverageDirectory: './coverage/',
  coverageThreshold: {
    global: {
      branches: 9,
      functions: 9,
      lines: 27,
      statements: 25,
    },
  },
  modulePaths: ['.'],
  collectCoverage: true,
  setupFiles: ['./tests/setup.js'],
};
