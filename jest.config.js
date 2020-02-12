module.exports = {
  preset: 'ts-jest',
  testRegex: [
    'src/test/.*\\.(js|ts)$',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$'
  ],
  testPathIgnorePatterns: ['build'],
  modulePathIgnorePatterns: ['build', 'node_modules'],
  testEnvironment: 'node'
};
