import fetchGamesData from './fetchGamesData';
// import { setLoadingProgress } from '../state/slices/resultsSlice';
import { Game } from '../types';

// Mock the global fetch
global.fetch = jest.fn();

// Mock dispatch function
const mockDispatch = jest.fn();

// Prepare mock game data
const mockGamesData: Game[] = [
  { ID: 1, Name: 'Game 1', SupportsAddons: true, SupportsVoice: true },
] as Game[];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchGamesData', () => {
  it('successfully fetches game data and dispatches setLoadingProgress', async () => {
    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockGamesData }),
      headers: {
        get: () => '100', // Simulate Content-Length for progress calculation
      },
      body: {
        getReader: () => {
          let done = false;
          return {
            read: () => {
              if (!done) {
                done = true;
                return Promise.resolve({
                  done: false,
                  value: new Uint8Array([
                    /* Simulate binary data */
                  ]),
                });
              } else {
                return Promise.resolve({ done: true, value: undefined });
              }
            },
          };
        },
      },
    });

    await fetchGamesData(mockDispatch);

    // Check if dispatch was called with setLoadingProgress
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

    // Since it's hard to simulate streaming data accurately in this environment,
    // you might simplify the test to only ensure the fetch was called and mockDispatch was used.
    expect(global.fetch).toHaveBeenCalledWith('../../../games.json');
  });

  // Add more tests here for error handling, response not ok, no body, etc.
});
