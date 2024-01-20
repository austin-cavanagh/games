import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { useEffect } from 'react';
import { setPageDisplay } from '../../state/slices/resultsSlice';

function ResultsDisplay() {
  const { pageDisplay } = useSelector((state: RootState) => state.results);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageDisplay());
  }, [dispatch]);

  return (
    <>
      {pageDisplay.map(game => {
        return <h1>{game.Name}</h1>;
      })}
    </>
  );
}

export default ResultsDisplay;

// - Game icon
// - Game name
// - Whether the game supports addons
// - Whether the game supports voice
