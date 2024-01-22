import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import classNames from '../../functions/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setSortDropdown } from '../../state/slices/searchSlice';

const sortByOptions = ['Order', 'A-Z', 'Z-A', 'Game Files'];

function SortDropdown() {
  const { sortDropdown } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (input: string) => {
    dispatch(setSortDropdown(input));
  };

  return (
    <Listbox
      value={sortDropdown}
      onChange={(input: string) => handleChange(input)}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <div className="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 px-3 py-2 text-white shadow-sm">
                <p className="text-sm font-semibold">{`Sort By: ${sortDropdown}`}</p>
              </div>
              <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  data-testid="sort-chevron-icon"
                />
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-40 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {sortByOptions.map(option => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'cursor-default select-none p-4 text-sm',
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {option}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? 'text-white' : 'text-indigo-600'
                              }
                            >
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          ) : null}
                        </div>
                      </div>
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

export default SortDropdown;
