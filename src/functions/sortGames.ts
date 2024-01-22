import { Game } from '../types';

function sortGames(gamesArray: Game[], sortCriteria: string) {
  switch (sortCriteria) {
    case 'Order':
      return [...gamesArray].sort((a, b) => a.Order - b.Order);
    case 'A-Z':
      return [...gamesArray].sort((a, b) => a.Name.localeCompare(b.Name));
    case 'Z-A':
      return [...gamesArray].sort((a, b) => b.Name.localeCompare(a.Name));
    case 'Game Files':
      return [...gamesArray].sort(
        (a, b) => b.GameFiles.length - a.GameFiles.length,
      );
    default:
      return gamesArray;
  }
}

export default sortGames;
