// Githubの検索Queryを生成するClass
//   issue-query-processor モジュールが依存している.
//   切り分けた意図としては、query文字列が正しく生成されないと searchLatestIssue() メソッドが動かない.
//   ただ、searchLatestIssue() メソッドをテストする為にはGitHubのAPIをMockすることが必要で
//   テストの準備が面倒になることが懸念される.
//   Query部分だけを別に用意して、これをテストすることで要求の実現を確認できるようにした
class GithubSearchQueryBuilder {
  // ToDo: private 修飾子をつけたいが、TS化の時に調整！
  #owner;
  #repository;
  #label;

  constructor(owner, repo) {
    this.#owner = owner;
    this.#repository = repo;
    this.#label = undefined;
  }

  setLabel(value) {
    this.#label = value;
    return this;
  }

  get label() {
    return this.#label;
  }

  build() {
    const query = `type:issue repo:${this.#owner}/${this.#repository}`;
    // MARK: 日本語文字列であっても、エンコードしてしまうと検索が正しく出来なかった。
    //       labelはエンコードせずに含める
    return this.#label ? `${query} label:${this.#label}` : query;
  }
}

module.exports = { GithubSearchQueryBuilder };
