import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ResultsDisplay from './ResultsDisplay';
import { Game } from '../../types';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { setSelectedGame } from '../../state/slices/resultsSlice';

const fakeGame: Game = {
  AddOnSettingsFileFilter: 'sample filter',
  AddOnSettingsFileRemovalFilter: 'sample removal filter',
  AddOnSettingsFolderFilter: 'sample folder filter',
  AddOnSettingsStartingFolder: 'sample starting folder',
  Assets: [],
  BundleAssets: true,
  CategorySections: [],
  DateModified: '2024-01-14T12:00:00Z',
  FileParsingRules: [],
  GameDetectionHints: [],
  GameFiles: [],
  ID: 1111111111111,
  MaxFileSize: 1024,
  MaxFreeStorage: 1024000,
  MaxPremiumStorage: 2048000,
  Name: 'Sample Game',
  Order: 1,
  ProfilerAddOnId: 2,
  Slug: 'sample-game',
  SupportsAddons: true,
  SupportsNotifications: false,
  SupportsVoice: true,
  TwitchGameId: 12345,
};

const fakeGame2: Game = {
  AddOnSettingsFileFilter: 'sample filter',
  AddOnSettingsFileRemovalFilter: 'sample removal filter',
  AddOnSettingsFolderFilter: 'sample folder filter',
  AddOnSettingsStartingFolder: 'sample starting folder',
  Assets: [],
  BundleAssets: true,
  CategorySections: [],
  DateModified: '2024-01-14T12:00:00Z',
  FileParsingRules: [],
  GameDetectionHints: [],
  GameFiles: [],
  ID: 1111111111111,
  MaxFileSize: 1024,
  MaxFreeStorage: 1024000,
  MaxPremiumStorage: 2048000,
  Name: 'Sample Game',
  Order: 1,
  ProfilerAddOnId: 2,
  Slug: 'sample-game',
  SupportsAddons: false,
  SupportsNotifications: false,
  SupportsVoice: false,
  TwitchGameId: 12345,
};

const mockStore = configureStore();

describe('ResultsDisplay', () => {
  it('renders fallback image when the main image fails to load', () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: true,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 0,
        selectedGame: null,
        gamesArray: [fakeGame],
        promptUpdate: false,
      },
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
        <ResultsDisplay />
      </Provider>,
    );

    const image = screen.getByTestId('game-image');
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', '../../../images/no-image.png');
  });

  it('renders fallback image when the main image fails to load', async () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: true,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 0,
        selectedGame: null,
        gamesArray: [fakeGame],
        promptUpdate: false,
      },
      search: {
        nameInput: '',
        addonsDropdown: '-',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ResultsDisplay />
      </Provider>,
    );

    const game = screen.getByTestId('click-game');
    await userEvent.click(game);

    expect(store.dispatch).toHaveBeenCalledWith(setSelectedGame(fakeGame));
  });

  it('renders fallback image when the main image fails to load', async () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: true,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 0,
        selectedGame: fakeGame,
        gamesArray: [fakeGame2],
        promptUpdate: false,
      },
      search: {
        nameInput: '',
        addonsDropdown: '-',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ResultsDisplay />
      </Provider>,
    );
  });
});
