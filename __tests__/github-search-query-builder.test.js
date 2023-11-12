const {
  GithubSearchQueryBuilder
} = require('../src/github-search-query-builder');

describe('GithubSearchQueryBuilder', () => {
  const github = new GithubSearchQueryBuilder(
    'TakahashiIkki',
    'previous-issue-finder'
  );

  it('labelを指定しない場合でも正しいQueryが返る', async () => {
    expect(github.build()).toBe(
      'type:issue repo:TakahashiIkki/previous-issue-finder'
    );
  });

  it('labelを指定した時、英語では特にエンコードされずにQuery文字列が生成される', async () => {
    expect(github.setLabel('daily').build()).toBe(
      'type:issue repo:TakahashiIkki/previous-issue-finder label:daily'
    );
  });

  it('labelを指定した時、日本語でもエンコードされずにQuery文字列が生成される', async () => {
    expect(github.setLabel('日報').build()).toBe(
      `type:issue repo:TakahashiIkki/previous-issue-finder label:日報`
    );
  });
});
