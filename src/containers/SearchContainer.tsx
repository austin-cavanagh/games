import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { useEffect } from 'react';
import { fetchGames } from '../state/slices/resultsSlice';

function SearchContainer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return <h1>Search Container</h1>;
}

export default SearchContainer;
