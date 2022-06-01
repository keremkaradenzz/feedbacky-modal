module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  verbose: true,
  testEnvironment: 'jest-environment-jsdom'
};
