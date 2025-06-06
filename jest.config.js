module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
    '@mdxeditor/editor/style.css': '<rootDir>/src/__mocks__/styleMock.js',
    '@mdxeditor/editor': '<rootDir>/src/__mocks__/@mdxeditor/editor.tsx'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
    }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@mdxeditor/editor)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
}; 