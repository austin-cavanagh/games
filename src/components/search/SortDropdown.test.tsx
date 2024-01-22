import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SortDropdown from './SortDropdown';
import { RootState } from '../../state/store';
import '@testing-library/jest-dom';
// import { setSortDropdown } from '../../state/slices/searchSlice';

const mockStore = configureStore<Partial<RootState>>();

const options = ['Order', 'A-Z', 'Z-A', 'Game Files'];

describe('SortDropdown', () => {
  it('renders the dropdown with default value correctly', () => {
    const initialState = {
      search: {
        nameInput: '',
        addonsDropdown: '-',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SortDropdown />
      </Provider>,
    );

    expect(screen.getByText('Sort By: Order')).toBeInTheDocument();
    expect(screen.getByTestId('sort-chevron-icon')).toBeInTheDocument();
  });

  // it('dispatches set', async () => {
  //   const initialState = {
  //     search: {
  //       nameInput: '',
  //       addonsDropdown: '-',
  //       voiceDropdown: '-',
  //       sortDropdown: 'Order',
  //     },
  //   };

  //   const store = mockStore(initialState);
  //   store.dispatch = jest.fn();

  //   render(
  //     <Provider store={store}>
  //       <SortDropdown />
  //     </Provider>,
  //   );

  //   expect(screen.getByTestId('sort-dropdown')).toHaveValue('Order');

  //   // const sortDropdown = screen.getByTestId('sort-chevron-icon');
  //   // userEvent.click(sortDropdown);

  //   // const sortByGameFiles = await screen.findByText('Game Files');
  //   // userEvent.click(sortByGameFiles);

  //   // console.log(store.getActions());

  //   // expect(store.dispatch).toHaveBeenCalledWith(setSortDropdown('Game Files'));
  // });

  options.forEach(option => {
    it(`allows the user to select option "${option}"`, async () => {
      const initialState = {
        search: {
          nameInput: '',
          addonsDropdown: '-',
          voiceDropdown: '-',
          sortDropdown: option,
        },
      };

      const store = mockStore(initialState);

      render(
        <Provider store={store}>
          <SortDropdown />
        </Provider>,
      );

      userEvent.click(screen.getByTestId('sort-chevron-icon'));
      const optionElement = await screen.findByText(option);
      userEvent.click(optionElement);
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
