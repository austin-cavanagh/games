import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function PagesDisplayLeft() {
  const { currentPage, totalGames } = useSelector(
    (state: RootState) => state.results,
  );

  const startResult = totalGames === 0 ? 0 : (currentPage - 1) * 12 + 1;
  const endResult =
    totalGames === 0 ? 0 : Math.min(currentPage * 12, totalGames);

  return (
    <p className="text-sm text-gray-700">
      Showing <span className="font-medium">{startResult}</span> to{' '}
      <span className="font-medium">{endResult}</span> of{' '}
      <span className="font-medium">{totalGames.toLocaleString()}</span> results
    </p>
  );
}

export default PagesDisplayLeft;
