import PagesContainer from './containers/PagesContainer';
import ResultsContainer from './containers/ResultsContainer';
import SearchContainer from './containers/SearchContainer';

function App() {
  return (
    <div className="flex flex-col mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 min-h-screen">
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
  );
}

export default App;
