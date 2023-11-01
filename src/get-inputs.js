const core = require('@actions/core');
const { context } = require('@actions/github');

const getInputs = () => ({
  token: core.getInput('repo_token'),
  repo: context.repo.repo,
  issueNumber: core.getInput('issue_number', { required: true })
});

module.exports = { getInputs };
