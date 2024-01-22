import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function LoadingDisplay() {
  const { loadingProgress } = useSelector((state: RootState) => state.results);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * ((100 - loadingProgress) / 100);

  return (
    <div className="flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth="20"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="#4f47e6ff"
          strokeWidth="20"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 100 100)"
        />
        <text x="100" y="110" textAnchor="middle" fontSize="24" fill="#333">
          {`${loadingProgress}%`}
        </text>
      </svg>
    </div>
  );
}

export default LoadingDisplay;
