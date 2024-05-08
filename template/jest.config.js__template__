/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "store/**/*.js",
    "!**/*.mock.js",
    "!**/*.story.js",
    "!**/*.styles.js",
    "!**styles/**/*.js",
    "!**/node_modules/**",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "src/index.ts", "src/types"],
  coverageReporters: ["lcov", "json", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
