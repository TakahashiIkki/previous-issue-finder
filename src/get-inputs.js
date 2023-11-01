const core = require('@actions/core');
const { context } = require('@actions/github');

const getInputs = () => ({
  token: core.getInput('repo_token'),
  owner: context.repo.owner,
  repo: context.repo.repo,
  label: core.getInput('label', { required: true })
});

module.exports = { getInputs };
