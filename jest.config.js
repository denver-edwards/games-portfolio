//
// /** @type {import('jest').Config} */
// const config = {
//   // Indicates whether the coverage information should be collected while executing the test
//   collectCoverage: true,
//
//   // The directory where Jest should output its coverage files
//   coverageDirectory: "coverage",
//
//   // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
//   moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
//
//   // The test environment that will be used for testing
//   testEnvironment: "jsdom",
//
// };
//
// module.exports = config;

const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);
