import { SearchState } from '../state/slices/searchSlice';
import { Game } from '../types';

function filterGames(games: Game[], searchState: SearchState) {
  const { nameInput, addonsDropdown, voiceDropdown } = searchState;

  const namesFiltered = games.filter(game => {
    return game.Name.toLowerCase().includes(nameInput.toLowerCase());
  });

  const addonsFiltered = namesFiltered.filter(game => {
    if (addonsDropdown === '-') return true;
    if (addonsDropdown === 'Yes') return game.SupportsAddons === true;
    if (addonsDropdown === 'No') return game.SupportsAddons === false;
  });

  const voiceFiltered = addonsFiltered.filter(game => {
    if (voiceDropdown === '-') return true;
    if (voiceDropdown === 'Yes') return game.SupportsVoice === true;
    if (voiceDropdown === 'No') return game.SupportsVoice === false;
  });

  return voiceFiltered;
}

export default filterGames;
