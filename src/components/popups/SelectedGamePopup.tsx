import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setSelectedGame } from '../../state/slices/resultsSlice';

function SelectedGamePopup() {
  const { selectedGame } = useSelector((state: RootState) => state.results);
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => dispatch(setSelectedGame(null));

  const gameFilesArray = selectedGame?.GameFiles;
  const files =
    gameFilesArray && gameFilesArray.length > 0
      ? gameFilesArray.map(file => file.FileName).join(', ')
      : 'No Files';

  const categoriesArray = selectedGame?.CategorySections;
  const categories =
    categoriesArray && categoriesArray.length > 0
      ? categoriesArray.map(file => file.Name).join(', ')
      : 'No Categories';

  return (
    <Transition.Root show={selectedGame !== null} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  {/* Image */}
                  <img
                    className="mx-auto h-20 w-20 flex-shrink-0 rounded-lg"
                    src={`../../../images/${selectedGame?.ID}.png`}
                  />

                  {/* Name */}
                  <Dialog.Title className="text-2xl font-semibold text-gray-900">
                    {selectedGame?.Name}
                  </Dialog.Title>

                  <div className="flex items-center justify-center gap-x-2">
                    {/* Add-Ons Icon */}
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        !selectedGame?.SupportsAddons
                          ? 'bg-red-50 text-red-700 ring-red-600/10'
                          : 'bg-green-50 text-green-700 ring-green-600/20'
                      }`}
                    >
                      Add-Ons
                    </span>

                    {/* Voice Support Icon */}
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        !selectedGame?.SupportsVoice
                          ? 'bg-red-50 text-red-700 ring-red-600/10'
                          : 'bg-green-50 text-green-700 ring-green-600/20'
                      }`}
                    >
                      Voice Support
                    </span>
                  </div>

                  {/* Categories */}
                  <div className="w-full text-left">
                    <h3 className="text-base font-semibold text-gray-800">
                      Categories
                    </h3>
                    <p className="text-sm text-gray-500">
                      {categories !== 'No Categories'
                        ? categories
                        : 'No Categories'}
                    </p>
                  </div>

                  {/* Files */}
                  <div className="w-full text-left">
                    <h3 className="text-base font-semibold text-gray-800">
                      Files
                    </h3>
                    <p className="text-sm text-gray-500">
                      {files !== 'No Files' ? files : 'No Files'}
                    </p>
                  </div>

                  {/* Slug */}
                  <div className="w-full text-left">
                    <h3 className="text-base font-semibold text-gray-800">
                      Slug
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedGame?.Slug}
                    </p>
                  </div>

                  {/* Go Back Button */}
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleClose}
                  >
                    Go Back
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default SelectedGamePopup;
