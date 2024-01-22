import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import LoadingDisplay from '../components/results/LoadingDisplay';
import ErrorDisplay from '../components/results/ErrorDisplay';
import ResultsDisplay from '../components/results/ResultsDisplay';

function ResultsContainer() {
  const { isLoading, isError } = useSelector(
    (state: RootState) => state.results,
  );

  const useCenteredLayout = isError || isLoading;

  return (
    <div
      className={`w-full ${
        useCenteredLayout ? 'flex items-center justify-center' : ''
      }`}
    >
      {isError && <ErrorDisplay />}
      {isLoading && <LoadingDisplay />}
      {!isLoading && !isError && <ResultsDisplay />}
    </div>
  );
}

export default ResultsContainer;
