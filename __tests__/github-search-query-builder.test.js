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

  it('labelを指定した時、英語であれば特にエスケープされずにQuery文字列が生成される', async () => {
    expect(github.setLabel('daily').build()).toBe(
      'type:issue repo:TakahashiIkki/previous-issue-finder label: daily'
    );
  });

  it('labelを指定した時、日本語文字列であればエンコードしたQuery文字列が生成される', async () => {
    // Mark:
    // https://github.com/search?q=repo%3ATakahashiIkki%2Fprevious-issue-finder%20label%3A%E6%97%A5%E5%A0%B1&type=issues
    // の検索文字列により 日報をエンコードすると%E6%97%A5%E5%A0%B1 という文字列が得られる
    expect(github.setLabel('日報').build()).toBe(
      `type:issue repo:TakahashiIkki/previous-issue-finder label: %E6%97%A5%E5%A0%B1`
    );
  });
});
