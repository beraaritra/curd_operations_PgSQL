// jest.config.js
module.exports = {
    testEnvironment: 'node',
    verbose: true, // Show individual test results
    transform: { 
      '^.+\\.js$': 'babel-jest',  // Use babel to transpile the code
    },
    collectCoverage: true,        // Collect code coverage
    coverageDirectory: 'coverage',  // Store coverage reports here
  };
  