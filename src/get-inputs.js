const core = require('@actions/core');
const { context } = require('@actions/github');

const getInputs = () => ({
  token: core.getInput('repo_token'),
  owner: context.repo.owner,
  repo: context.repo.repo,
  tag: core.getInput('tag', { required: true })
});

module.exports = { getInputs };
