import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SelectedGamePopup from './SelectedGamePopup';
import '@testing-library/jest-dom';
import { Game } from '../../types';

describe('SelectedGamePopup', () => {
  const mockStore = configureStore();

  it('correctly renders SelectedGamePopup with correct data', () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 1,
        selectedGame: fakeGame,
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
});

const fakeGame: Game = {
  AddOnSettingsFileFilter: 'sample filter',
  AddOnSettingsFileRemovalFilter: 'sample removal filter',
  AddOnSettingsFolderFilter: 'sample folder filter',
  AddOnSettingsStartingFolder: 'sample starting folder',
  Assets: [],
  BundleAssets: true,
  CategorySections: [
    {
      ExtraIncludePattern: '([^\\/\\\\]+\\.ctoc)$',
      GameID: 64,
      ID: 14,
      InitialInclusionPattern: '([^\\/\\\\]+\\.ctoc)$',
      Name: 'fakeCategory',
      PackageType: 4,
      Path: 'Data\\Gui\\Customized',
    },
  ],
  DateModified: '2024-01-14T12:00:00Z',
  FileParsingRules: [],
  GameDetectionHints: [],
  GameFiles: [
    {
      FileName: 'fakefile.exe',
      FileType: 3,
      GameId: 64,
      Id: 263,
      IsRequired: false,
      PlatformType: 4,
    },
  ],
  ID: 1,
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
