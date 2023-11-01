const github = require('@actions/github');

const searchLatestLabeledIssue = async (token, owner, repo, searchByLabel) => {
  const githubClient = github.getOctokit(token);

  // 指定したラベルがついた issue を一件のみ取得する
  const { data: issues } = await githubClient.rest.search.issuesAndPullRequests(
    {
      q: `repo:${owner}/${repo} label:${searchByLabel} type:issue`,
      sort: 'created',
      per_page: 1
    }
  );

  if (!issues) {
    return undefined;
  }

  if (issues.items.length < 1) {
    return undefined;
  }

  return {
    issueNumber: issues.items[0].number,
    issueBody: issues.items[0].body
  };
};

module.exports = { searchLatestLabeledIssue };
