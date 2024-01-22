import { useEffect } from 'react';
import PagesContainer from './containers/PagesContainer';
import ResultsContainer from './containers/ResultsContainer';
import SearchContainer from './containers/SearchContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './state/store';
import { fetchGamesThunk } from './state/slices/resultsSlice';
import UpdateGamesPopup from './components/popups/UpdateGamesPopup';

function App() {
  const { promptUpdate } = useSelector((state: RootState) => state.results);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const updateDataInterval = 5000;

    dispatch(fetchGamesThunk());

    const updateData = setInterval(() => {
      dispatch(fetchGamesThunk());
    }, updateDataInterval);

    return () => {
      clearInterval(updateData);
    };
  }, [dispatch]);

  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
        <section className="px-4 py-4 sm:px-6 sm:py-5">
          <SearchContainer />
        </section>
        <section className="flex flex-grow overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
          <ResultsContainer />
        </section>
        <section className="overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
          <PagesContainer />
        </section>
      </div>

      {promptUpdate && <UpdateGamesPopup />}
    </>
  );
}

export default App;
