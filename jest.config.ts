/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPathIgnorePatterns: [
    '<rootDir>/src/utils/*.ts',
    '<rootDir>/src/services/*.ts',
    '<rootDir>/src/config/*.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/utils/*.ts',
    '<rootDir>/src/services/*.ts',
    '<rootDir>/src/config/*.ts',
  ],
  collectCoverage: true,
};
