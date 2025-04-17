module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-paper|react-native-safe-area-context|react-native-vector-icons)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    'mobx-react-lite': '<rootDir>/__mocks__/mobx-react-lite.js',
    'src/api/analytics.ts': '<rootDir>/__mocks__/analytics.js',
  },
};
