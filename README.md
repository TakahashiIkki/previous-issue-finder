# previous-issue-finder

- 指定した条件を満たす直近のIssueの内容を取得して返すAction.
- 現在は、指定条件として label を指定することが出来る 

## Example

```yml
name: 

on:
  workflow_dispatch:

jobs:
  patch:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3.0.2

      - name: Get previous issue
        uses: TakahashiIkki/previous-issue-finder@v1.1.0
        id: previous_issue
        with:
          label: daily

      # ${{ steps.previous_issue.outputs.previousIssue }}
      # ${{ steps.previous_issue.outputs.issueBody }}
```

## input

| Name         | Description           |
| ------------ |-----------------------|
| previousIssue  | Previous Issue number |
| issueBody | Issue Body            |

## Example Usage

### 日報

- 前日の日報内容をコピーして日報を作ることが出来る

```yaml
name: Nippou
on:
  workflow_dispatch:

permissions:
  contents: read
  issues: write

jobs:
  nippou:
    name: Nippou
    runs-on: ubuntu-latest
    env:
      LC_ALL: "ja_JP.UTF-8"
      TZ: "Asia/Tokyo"
    steps:
      - name: ja_JP.UTF-8
        run: |
          sudo locale-gen ja_JP.UTF-8
          sudo update-locale LANG=ja_JP.UTF-8

      - name: Get current date
        id: timestamp
        run: echo "CURRENT_DATE=$(TZ=Asia/Tokyo date +'%Y-%m-%d')" >> $GITHUB_OUTPUT

      - name: Get previous issue
        uses: TakahashiIkki/previous-issue-finder@v1.1.0
        id: previous_issue
        with:
          label: daily

      - name: nippou create
        uses: imjohnbo/issue-bot@v3
        with:
          assignees: "TakahashiIkki"
          labels: "daily"
          title: ${{ steps.timestamp.outputs.CURRENT_DATE }}
          body: |-
            ${{ steps.previous_issue.outputs.issueBody }}
          pinned: true
          close-previous: true
          linked-comments: true
```
