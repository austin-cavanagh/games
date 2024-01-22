// Use dynamic import to load the polyfill
import('text-encoding').then(({ TextDecoder }) => {
  global.TextDecoder = TextDecoder;
});

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/cors-anywhere/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
