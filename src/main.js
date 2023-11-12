const core = require('@actions/core');
const { getInputs } = require('./get-inputs');
const { searchLatestIssue } = require('./issue-query-processor');
const { setOutputs } = require('./set-outputs');
const { GithubSearchQueryBuilder } = require('./github-search-query-builder');

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
    const { token, owner, repo, label } = getInputs();

    const githubQuery = new GithubSearchQueryBuilder(owner, repo).setLabel(
      label
    );
    const issue = await searchLatestIssue(token, githubQuery);
    if (!issue) {
      core.setFailed('指定したタグでIssueが発見できませんでした.');
      return;
    }

    setOutputs(issue.issueNumber, issue.issueBody);
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message);
  }
}

module.exports = {
  run
};
