import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SelectedGamePopup from './SelectedGamePopup';
import '@testing-library/jest-dom';
import { Game } from '../../types';
import { userEvent } from '@testing-library/user-event';
import { setSelectedGame } from '../../state/slices/resultsSlice';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

const mockStore = configureStore();

const mockGame: Game = {
  CategorySections: [{ Name: 'fakeCategory' }],
  GameFiles: [{ FileName: 'fakefile.exe' }],
  Name: 'Sample Game',
  Slug: 'sample-game',
  SupportsAddons: true,
  SupportsVoice: true,
} as Game;

describe('SelectedGamePopup', () => {
  it('correctly renders SelectedGamePopup with correct data', () => {
    const initialState = {
      results: {
        selectedGame: mockGame,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SelectedGamePopup />
      </Provider>,
    );

    expect(screen.getByText('Add-Ons')).toBeInTheDocument();
    expect(screen.getByText('Voice Support')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('fakeCategory')).toBeInTheDocument();
    expect(screen.getByText('Files')).toBeInTheDocument();
    expect(screen.getByText('fakefile.exe')).toBeInTheDocument();
    expect(screen.getByText('Slug')).toBeInTheDocument();
    expect(screen.getByText('sample-game')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('rendering without a selected game', () => {
    const initialState = {
      results: {
        selectedGame: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SelectedGamePopup />
      </Provider>,
    );
  });

  it('dispatching setSelectedGame(null)', async () => {
    const initialState = {
      results: {
        selectedGame: mockGame,
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SelectedGamePopup />
      </Provider>,
    );

    const button = screen.getByText('Go Back');
    await userEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedGame(null));
  });
});
