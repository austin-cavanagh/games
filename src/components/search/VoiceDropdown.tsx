import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setVoiceDropdown } from '../../state/slices/searchSlice';
import classNames from '../../functions/classNames';

const options: string[] = ['-', 'Yes', 'No'];

function VoiceDropdown() {
  const voiceDropdown = useSelector(
    (state: RootState) => state.search.voiceDropdown,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (input: string) => {
    dispatch(setVoiceDropdown(input));
  };

  return (
    <Listbox value={voiceDropdown} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="flex justify-between">
            <label
              htmlFor="voice"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Voice Support
            </label>
          </div>
          <div className="relative mt-2">
            <Listbox.Button
              id="voice"
              data-testid="voice-dropdown"
              className={`relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left ${
                voiceDropdown === '-' ? 'text-gray-400' : 'text-gray-900'
              } shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            >
              <span className="block truncate">{voiceDropdown}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                  data-testid="voice-chevron-icon"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((input, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={input}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {input}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default VoiceDropdown;
