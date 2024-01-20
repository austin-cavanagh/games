import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function LoadingDisplay() {
  const { loadingProgress } = useSelector((state: RootState) => state.results);

  return <h1>{`${loadingProgress}%`}</h1>;
}

export default LoadingDisplay;
