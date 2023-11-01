const core = require('@actions/core');
const { getInputs } = require('./get-inputs');

function run() {
  main().catch(error => {
    core.error(error);
    core.setFailed(error.message);
  });
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function main() {
  try {
    const { issueNumber, repo } = getInputs();

    // Set outputs for other workflow steps to use
    core.setOutput('time', [
      {
        repo,
        issueNumber
      }
    ]);
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = {
  run
};
