import AddonsDropdown from '../components/search/AddonsDropdown';
import NameInput from '../components/search/NameInput';
import SortByDropdown from '../components/search/SortByDropdown';
import VoiceSupportDropdown from '../components/search/VoiceDropdown';

function SearchContainer() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div className="w-full md:w-auto md:flex-1">
          <NameInput />
        </div>
        <div className="w-full md:w-auto md:flex-1">
          <AddonsDropdown />
        </div>
        <div className="w-full md:w-auto md:flex-1">
          <VoiceSupportDropdown />
        </div>
        <div className="w-full md:w-auto md:flex-initial">
          <SortByDropdown />
        </div>
      </div>
    </div>
  );
}

export default SearchContainer;
