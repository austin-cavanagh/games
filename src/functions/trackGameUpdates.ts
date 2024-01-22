import { Game, GameUpdate } from '../types';

function trackGameUpdates(
  gamesArray: Game[],
  newGamesArray: Game[],
): GameUpdate[] {
  const updatesArray: GameUpdate[] = [];

  // Check for new or updated games
  newGamesArray.forEach(fetchedGame => {
    const existingGame = gamesArray.find(game => game.ID === fetchedGame.ID);
    if (existingGame) {
      if (JSON.stringify(existingGame) !== JSON.stringify(fetchedGame)) {
        updatesArray.push({ type: 'updated', data: fetchedGame });
      }
    } else {
      updatesArray.push({ type: 'added', data: fetchedGame });
    }
  });

  // Check for removed games
  gamesArray.forEach(existingGame => {
    const isGameStillPresent = newGamesArray.some(
      fetchedGame => fetchedGame.ID === existingGame.ID,
    );
    if (!isGameStillPresent) {
      updatesArray.push({ type: 'removed', data: existingGame });
    }
  });

  return updatesArray;
}

export default trackGameUpdates;
