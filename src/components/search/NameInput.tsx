import { Combobox } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setNameInput } from '../../state/slices/searchSlice';
import { debounce } from 'lodash';

function NameInput() {
  const { nameInput } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<AppDispatch>();
  const handleInputChange = debounce((name: string) => {
    dispatch(setNameInput(name));
  }, 300);

  return (
    <Combobox
      as="div"
      value={nameInput}
      onChange={input => {
        handleInputChange(input);
      }}
    >
      <label
        htmlFor="maxPrice"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Game Name
      </label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={event => handleInputChange(event.target.value)}
          displayValue={() => nameInput}
          placeholder="Game name"
        />
      </div>
    </Combobox>
  );
}

export default NameInput;
