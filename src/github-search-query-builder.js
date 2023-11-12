// Githubの検索Queryを生成するClass
//   issue-query-processor モジュールが依存している.
//   切り分けた意図としては、ラベルに日本語が指定された時にエスケープ処理を行うことを想定するが
//   それを searchLatestLabeledIssue() メソッド内で実装してしてしまうと、
//   「ラベルに日本語が指定された時にエスケープ処理を行う」の要求をテストする為にGitHubのAPIを
//   Mockすることが必要でテストの準備が面倒になることが懸念される.
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
    return this.#label
      ? `${query} label: ${encodeURIComponent(this.#label)}`
      : query;
  }
}

module.exports = { GithubSearchQueryBuilder };
