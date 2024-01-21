import { useEffect } from 'react';
import PagesContainer from './containers/PagesContainer';
import ResultsContainer from './containers/ResultsContainer';
import SearchContainer from './containers/SearchContainer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './state/store';
import { fetchGamesThunk } from './state/slices/resultsSlice';
import UpdateGamesNotification from './components/popups/UpdateGamesDisplay';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGamesThunk());
  }, [dispatch]);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
      <section className="px-4 py-4 sm:px-6 sm:py-5">
        <SearchContainer />
      </section>
      <section className="flex flex-grow overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
        <ResultsContainer />
      </section>
      <section className="overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
        <PagesContainer />
      </section>

      <UpdateGamesNotification />
    </div>
  );
}

export default App;
