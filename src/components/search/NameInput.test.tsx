import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameInput from './NameInput';
import { RootState } from '../../state/store';
import '@testing-library/jest-dom';

const mockStore = configureStore<Partial<RootState>>();

describe('NameInput', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      search: {
        nameInput: '',
        addonsDropdown: '-',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    });
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <NameInput />
      </Provider>,
    );

    expect(screen.getByText('Game Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Game name')).toBeInTheDocument();
  });
});
