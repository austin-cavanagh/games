import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ResultsContainer from './ResultsContainer';
import '@testing-library/jest-dom';
import { Game } from '../types';

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
  ID: 1,
  MaxFileSize: 1024, // Sample value in bytes
  MaxFreeStorage: 1024000, // Sample value in bytes
  MaxPremiumStorage: 2048000, // Sample value in bytes
  Name: 'Sample Game',
  Order: 1,
  ProfilerAddOnId: 2,
  Slug: 'sample-game',
  SupportsAddons: true,
  SupportsNotifications: false,
  SupportsVoice: true,
  TwitchGameId: 12345,
};

describe('ResultsContainer', () => {
  const mockStore = configureStore();

  it('renders ErrorDisplay when isError is true', () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: true,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 0,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: false,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ResultsContainer />
      </Provider>,
    );

    expect(screen.getByText('Error Loading Game Data')).toBeInTheDocument();
  });

  it('renders LoadingDisplay when isLoading is true', () => {
    const initialState = {
      results: {
        isLoading: true,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 0,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: false,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ResultsContainer />
      </Provider>,
    );

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders ResultsDisplay when isLoading and isError are false', () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 1,
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
        <ResultsContainer />
      </Provider>,
    );

    expect(screen.getByText('Add-Ons')).toBeInTheDocument();
  });
});
