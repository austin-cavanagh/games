import PagesDisplayLeft from '../components/pages/PagesDisplayLeft';
import PagesDisplayRight from '../components/pages/PagesDisplayRight';

function PagesContainer() {
  return (
    <div className="flex items-center justify-between">
      <PagesDisplayLeft />
      <PagesDisplayRight />
    </div>
  );
}

export default PagesContainer;
