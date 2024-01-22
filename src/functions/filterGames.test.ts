import filterGames from './filterGames';
import { Game } from '../types';
import { SearchState } from '../state/slices/searchSlice';

const games: Game[] = [
  { Name: 'Game One', SupportsAddons: true, SupportsVoice: false },
  { Name: 'Game Two', SupportsAddons: false, SupportsVoice: true },
  { Name: 'Game Three', SupportsAddons: true, SupportsVoice: true },
] as Game[];

describe('filterGames', () => {
  it('filters games by name input', () => {
    const searchState: SearchState = {
      nameInput: 'game',
      addonsDropdown: '-',
      voiceDropdown: '-',
    } as SearchState;

    const filteredGames = filterGames(games, searchState);
    expect(filteredGames).toEqual(
      expect.arrayContaining([games[0], games[1], games[2]]),
    );
  });

  it('filters games by addons support', () => {
    const searchState: SearchState = {
      nameInput: '',
      addonsDropdown: 'Yes',
      voiceDropdown: '-',
    } as SearchState;

    const filteredGames = filterGames(games, searchState);
    expect(filteredGames).toEqual(expect.arrayContaining([games[0], games[2]]));
  });

  it('filters games by addons support', () => {
    const searchState: SearchState = {
      nameInput: '',
      addonsDropdown: 'No',
      voiceDropdown: '-',
    } as SearchState;

    const filteredGames = filterGames(games, searchState);
    expect(filteredGames).toEqual(expect.arrayContaining([games[1]]));
  });

  it('filters games by voice support', () => {
    const searchState: SearchState = {
      nameInput: '',
      addonsDropdown: '-',
      voiceDropdown: 'Yes',
    } as SearchState;

    const filteredGames = filterGames(games, searchState);
    expect(filteredGames).toEqual(expect.arrayContaining([games[1], games[2]]));
  });

  it('filters games by voice support', () => {
    const searchState: SearchState = {
      nameInput: '',
      addonsDropdown: '-',
      voiceDropdown: 'No',
    } as SearchState;

    const filteredGames = filterGames(games, searchState);
    expect(filteredGames).toEqual(expect.arrayContaining([games[0]]));
  });

  it('combines filters', () => {
    const searchState: SearchState = {
      nameInput: 'another',
      addonsDropdown: 'Yes',
      voiceDropdown: 'Yes',
    } as SearchState;

    const filteredGames = filterGames(games, searchState);
    expect(filteredGames.length).toBe(0);
  });
});
