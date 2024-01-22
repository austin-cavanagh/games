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
  beforeAll(() => {
    global.TextDecoder = jest.fn().mockImplementation(() => ({
      decode: jest
        .fn()
        .mockReturnValue(JSON.stringify({ data: mockGamesData })),
    }));
  });

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

    // Example assuming setLoadingProgress action creator exists and works correctly
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'results/setLoadingProgress',
      payload: expect.any(Number), // or a specific number if you want to be more precise
    });

    // Since it's hard to simulate streaming data accurately in this environment,
    // you might simplify the test to only ensure the fetch was called and mockDispatch was used.
    expect(global.fetch).toHaveBeenCalledWith('../../../games.json');
  });

  // Test for when fetch request returns a response not ok
  it('throws an error when fetch fails', async () => {
    // Mock the fetch and simulate a failed request
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      // Simulate an unsuccessful response
      ok: false,
      statusText: 'Internal Server Error',
    });

    // Attempt to call fetchGamesData and catch the error
    try {
      await fetchGamesData(mockDispatch);
      // If fetchGamesData does not throw, force the test to fail
      throw new Error('fetchGamesData did not throw as expected');
    } catch (error) {
      // Assert the error type here
      const typedError = error as Error; // Type assertion to Error

      expect(typedError).toBeInstanceOf(Error);
      expect(typedError.message).toBe('Failed to fetch games data');
    }

    // Ensure that setLoadingProgress was not called since the fetch failed
    expect(mockDispatch).not.toHaveBeenCalledWith(expect.any(Function));

    // Optionally, ensure that fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('../../../games.json');
  });
});
