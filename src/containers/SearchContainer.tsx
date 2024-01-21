import AddonsDropdown from '../components/search/AddonsDropdown';
import NameInput from '../components/search/NameInput';
import SortByDropdown from '../components/search/SortByDropdown';
import VoiceSupportDropdown from '../components/search/VoiceDropdown';

function SearchContainer() {
  const handleClear = () => {
    //
  };

  return (
    <form>
      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <NameInput />
          </div>
          <div className="sm:col-span-2">
            <AddonsDropdown />
          </div>
          <div className="sm:col-span-2">
            <VoiceSupportDropdown />
          </div>
        </div>

        <div className="mt-40 flex items-center justify-end gap-x-6">
          {/* <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sync Data
          </button> */}

          <button
            type="submit"
            onClick={handleClear}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Clear Form
          </button>
          <SortByDropdown />
        </div>
      </div>
    </form>
  );
}

export default SearchContainer;
