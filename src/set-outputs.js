const core = require('@actions/core');

const setOutputs = (issueNumber, issueBody) => {
  core.setOutput('previousIssue', issueNumber);
  core.setOutput('issueBody', issueBody);
};

module.exports = { setOutputs };
