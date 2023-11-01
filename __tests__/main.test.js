/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */
const core = require('@actions/core');
const main = require('../src/main');
const { getInputs } = require('../src/get-inputs');

// Mock the GitHub Actions core library
jest.mock('../src/get-inputs');
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation();
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();

// Mock the action's main function
const runMock = jest.spyOn(main, 'run');

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets the time output', async () => {
    getInputs.mockReturnValue({
      token: 'secure',
      repo: 'repo',
      issueNumber: 50
    });

    await main.run();
    expect(runMock).toHaveReturned();

    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'time', [
      {
        repo: 'repo',
        issueNumber: 50
      }
    ]);
  });

  describe('failed when required parameter', () => {
    it('fails when issue_number is not provided', async () => {
      getInputs.mockImplementation(name => {
        throw new Error('Input required and not supplied: issue_number');
      });

      await main.run();
      expect(runMock).toHaveReturned();

      // Verify that all of the core library functions were called correctly
      expect(setFailedMock).toHaveBeenNthCalledWith(
        1,
        'Input required and not supplied: issue_number'
      );
    });
  });
});
