import sortGames from './sortGames';
import { Game } from '../types';

const games: Game[] = [
  { ID: 1, Name: 'Game C', Order: 2, GameFiles: [{}, {}] },
  { ID: 2, Name: 'Game A', Order: 3, GameFiles: [{}] },
  { ID: 3, Name: 'Game B', Order: 1, GameFiles: [{}, {}, {}] },
] as Game[];

describe('sortGames', () => {
  it('sorts games by Order', () => {
    const sortedGames = sortGames(games, 'Order');
    expect(sortedGames.map(game => game.ID)).toEqual([3, 1, 2]);
  });

  it('sorts games by name A-Z', () => {
    const sortedGames = sortGames(games, 'A-Z');
    expect(sortedGames.map(game => game.ID)).toEqual([2, 3, 1]);
  });

  it('sorts games by name Z-A', () => {
    const sortedGames = sortGames(games, 'Z-A');
    expect(sortedGames.map(game => game.ID)).toEqual([1, 3, 2]);
  });

  it('sorts games by number of Game Files', () => {
    const sortedGames = sortGames(games, 'Game Files');
    expect(sortedGames.map(game => game.ID)).toEqual([3, 1, 2]);
  });

  it('returns original array for unknown criteria', () => {
    const sortedGames = sortGames(games, 'Unknown');
    expect(sortedGames).toEqual(games);
  });
});
