/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */
const main = require('../src/main');
const { getInputs } = require('../src/get-inputs');
const { setOutputs } = require('../src/set-outputs');

// Mock the GitHub Actions core library
jest.mock('../src/get-inputs');
jest.mock('../src/issue-query-processor', () => {
  return {
    searchLatestLabeledIssue: jest
      .fn()
      .mockResolvedValue({ issueNumber: 50, issueBody: 'sample issue value' })
  };
});
jest.mock('../src/set-outputs');

// Mock the action's main function
const runMock = jest.spyOn(main, 'run');

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets the issue output', async () => {
    getInputs.mockReturnValue({
      token: 'secure',
      owner: 'TakahashiIkki',
      repo: 'repo',
      issueNumber: 50,
      label: 'task'
    });

    await main.run();

    expect(runMock).toHaveReturned();
    expect(setOutputs).toHaveBeenNthCalledWith(1, 50, 'sample issue value');
  });
});
