import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddonsDropdown from './AddonsDropdown';
import { RootState } from '../../state/store';
import '@testing-library/jest-dom';

const mockStore = configureStore<Partial<RootState>>();

describe('AddonsDropdown', () => {
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
        <AddonsDropdown />
      </Provider>,
    );

    expect(screen.getByText('Add-Ons')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
