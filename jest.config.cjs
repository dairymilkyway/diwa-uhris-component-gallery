/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  // Transform ALL node_modules — this library has deep ESM transitive deps
  // (react-calendar → get-user-locale → memoize, sonner, @radix-ui, lucide-react, etc.)
  // Simpler and more robust than maintaining an allowlist.
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif|webp|woff2?|ttf|eot)$': '<rootDir>/jest.fileMock.cjs',
  },
  testMatch: ['<rootDir>/tests/**/*.test.[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
