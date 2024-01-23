import fetchGamesData from './fetchGamesData';
import { Game } from '../types';

// Mock global fetch function
global.fetch = jest.fn();

// Mock redux dispatch
const mockDispatch = jest.fn();

// Mock data for successful mock fetch requests
const mockGamesData: Game[] = [
  { ID: 1, Name: 'Game 1', SupportsAddons: true, SupportsVoice: true },
] as Game[];

beforeEach(() => {
  // Clears all information stored in mocks
  jest.clearAllMocks();
});

describe('fetchGamesData', () => {
  beforeAll(() => {
    // TextDecoder is a web api for decoding binary into strings
    global.TextDecoder = jest.fn().mockImplementation(() => ({
      decode: jest
        .fn()
        .mockReturnValue(JSON.stringify({ data: mockGamesData })),
    }));
  });

  it('successful fetch and dispatches setLoadingProgress', async () => {
    // Mock fetch with successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockGamesData }),
      headers: {
        get: () => '100',
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
                  value: new Uint8Array([]),
                });
              } else {
                return Promise.resolve({ done: true, value: undefined });
              }
            },
          };
        },
      },
    });

    // Dispatch setLoadingProgress
    await fetchGamesData(mockDispatch);

    // Verify setLoadingProgress happened
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'results/setLoadingProgress',
      payload: expect.any(Number),
    });

    // Verify fetch was called with correct url
    expect(global.fetch).toHaveBeenCalledWith('../../../games.json');
  });

  it('throws an error when fetch fails', async () => {
    // Mock fetch with failed response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    // Initiate fetch request and force it to error
    try {
      await fetchGamesData(mockDispatch);
      throw new Error('fetchGamesData did not throw as expected');
    } catch (error) {
      const typedError = error as Error;

      // Verify error was thrown
      expect(typedError).toBeInstanceOf(Error);
      expect(typedError.message).toBe('Failed to fetch games data');
    }

    // Verify no dispatches were called
    expect(mockDispatch).not.toHaveBeenCalledWith(expect.any(Function));

    // Verify fetch was called with righ url
    expect(global.fetch).toHaveBeenCalledWith('../../../games.json');
  });

  it('throws an error when ReadableStream is not supported', async () => {
    // Mock fetch where readable stream is not supported
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      // No readable string
      body: null,
    });

    // Verify error
    await expect(fetchGamesData(mockDispatch)).rejects.toThrow(
      'ReadableStream not supported',
    );

    // Verify no dispatches have been called
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
