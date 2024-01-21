import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function ResultsDisplay() {
  const { gamesArray, currentPage } = useSelector(
    (state: RootState) => state.results,
  );

  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGames = gamesArray.slice(startIndex, endIndex);

  return (
    <ul
      role="list"
      className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {currentGames.map((game) => (
        <li
          key={game.ID}
          className="col-span-1 flex flex-col rounded-lg p-5 text-center shadow"
        >
          {/* Game Image */}
          <img
            className="mx-auto h-20 w-20 flex-shrink-0 rounded-lg"
            src={`../../../images/${game.ID}.png`}
            alt=""
          />

          {/* Game Info */}
          <div className="mt-4 flex flex-1 flex-col space-y-1">
            <h3 className="text-sm font-medium text-gray-900">{game.Name}</h3>
            <span className="text-sm text-gray-500">
              {`Supports Addons: ${game.SupportsAddons ? 'Yes' : 'No'}`}
            </span>{' '}
            <span className="text-sm text-gray-500">
              {`Supports Voice: ${game.SupportsVoice ? 'Yes' : 'No'}`}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ResultsDisplay;
