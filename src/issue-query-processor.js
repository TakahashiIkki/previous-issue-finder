const github = require('@actions/github');
const { GithubSearchQueryBuilder } = require('./github-search-query-builder');

const searchLatestIssue = async (token, githubQuery) => {
  // ToDo: TS化してこれ消したい.
  if (!(githubQuery instanceof GithubSearchQueryBuilder)) {
    throw new Error(
      'githubQuery 引数は GithubSearchQueryBuilder のインスタンスである必要があります.'
    );
  }

  const githubClient = github.getOctokit(token);

  // 指定した条件の issue を一件のみ取得する
  const { data: issues } = await githubClient.rest.search.issuesAndPullRequests(
    {
      q: githubQuery.build(),
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

module.exports = { searchLatestIssue };
