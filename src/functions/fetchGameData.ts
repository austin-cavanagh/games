import { Dispatch } from 'redux';
import { setLoadingProgress } from '../state/slices/resultsSlice';
import { Game } from '../types';

async function fetchGameData(dispatch: Dispatch): Promise<Game[]> {
  const response: Response = await fetch('../../../games.json');

  if (!response.ok) {
    throw new Error('Failed to fetch games data');
  }

  // Get Content-Length header to determine the size of the response
  const contentLength: string = response.headers.get('content-length') || '0';
  let loaded: number = 0;

  // If response body is not readable it does not support streaming
  if (!response.body) {
    throw new Error('ReadableStream not supported');
  }

  // Reader from the response body to read the data stream
  const reader: ReadableStreamDefaultReader = response.body.getReader();

  // Stores chunks of data as they come in (array of 8-bit unsigned integers)
  const chunks: Uint8Array[] = [];

  const read = async (): Promise<void> => {
    // Read each incoming chunk of data
    const { done, value }: ReadableStreamReadResult<Uint8Array> =
      await reader.read();

    // Return when reading is complete
    if (done) {
      return;
    }

    // Add new chunk and calculate the total loaded data
    loaded += value.byteLength;
    const progress: number = Math.round(
      (loaded / parseInt(contentLength)) * 100
    );

    // Dispatch action to update the loadingProgress state
    dispatch(setLoadingProgress(progress));

    // Add chunk to array of chunks
    chunks.push(value);

    // Call function again to continue reading until all chunks are recieved
    return read();
  };

  // Call function defined above to start reading the response stream
  await read();

  // Combine all chunks into a single Uint8Array
  const total: number = chunks.reduce((acc, val) => acc + val.length, 0);
  let position: number = 0;
  const allChunks: Uint8Array = new Uint8Array(total);
  for (const chunk of chunks) {
    allChunks.set(chunk, position);
    position += chunk.length;
  }

  // Convert array of chunks into text string
  const text: string = new TextDecoder().decode(allChunks);

  // Parse the text string as JSON
  const data: { data: Game[] } = JSON.parse(text) as { data: Game[] };

  // Sort games array based on Order property
  const sortedGames: Game[] = data.data.sort((a, b) => a.Order - b.Order);

  return sortedGames;
}

export default fetchGameData;
