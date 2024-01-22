import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { Game } from '../../types';
import {
  setSelectedGame,
  setTotalGames,
} from '../../state/slices/resultsSlice';
import SelectedGameDisplay from '../popups/SelectedGamePopup';
import filterGames from '../../functions/filterGames';
import { useEffect, useState } from 'react';
import sortGames from '../../functions/sortGames';

function ResultsDisplay() {
  const { gamesArray, currentPage, selectedGame } = useSelector(
    (state: RootState) => state.results,
  );
  const searchState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<AppDispatch>();

  // Placing filteredGames in a useState to lower amount of recalculations with renders
  const [filteredAndSortedGames, setFilteredAndSortedGames] =
    useState<Game[]>(gamesArray);

  // Recalculaing array when the gamesArray or searchState change
  useEffect(() => {
    const filteredGames = filterGames(gamesArray, searchState);
    const sortedGames = sortGames(filteredGames, searchState.sortDropdown);
    setFilteredAndSortedGames(sortedGames);

    // Also sending a dispatch to update currentPage state
    dispatch(setTotalGames(sortedGames.length));

    // sortedGames.forEach(game => console.log(game.CategorySections.length));
  }, [gamesArray, searchState, dispatch]);

  const handleSelectGame = (game: Game) => dispatch(setSelectedGame(game));

  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGames = filteredAndSortedGames.slice(startIndex, endIndex);

  return (
    <>
      <ul
        role="list"
        className="grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {currentGames.map(game => (
          <li
            key={game.ID}
            onClick={() => handleSelectGame(game)}
            className="col-span-1 flex flex-col justify-around rounded-lg p-5 text-center shadow hover:cursor-pointer"
          >
            {/* Image */}
            <img
              className="mx-auto h-16 w-16 flex-shrink-0 rounded-lg"
              src={`../../../images/${game.ID}.png`}
              onError={e => {
                e.currentTarget.src = '../../../images/no-image.png';
              }}
              alt=""
            />

            {/* Name */}
            <h3 className="text-sm font-medium text-gray-900">{game.Name}</h3>

            <div className="flex items-center justify-center gap-x-2">
              {/* Add-Ons Icon */}
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  !game.SupportsAddons
                    ? 'bg-red-50 text-red-700 ring-red-600/10'
                    : 'bg-green-50 text-green-700 ring-green-600/20'
                }`}
              >
                Add-Ons
              </span>

              {/* Voice Support Icon */}
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  !game.SupportsVoice
                    ? 'bg-red-50 text-red-700 ring-red-600/10'
                    : 'bg-green-50 text-green-700 ring-green-600/20'
                }`}
              >
                Voice Support
              </span>
            </div>
          </li>
        ))}
      </ul>

      {selectedGame && <SelectedGameDisplay />}
    </>
  );
}

export default ResultsDisplay;
