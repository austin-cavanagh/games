import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SelectedGamePopup from './SelectedGamePopup';
import '@testing-library/jest-dom';
// import { CategorySection, GameFile } from '../../types';
import { Game } from '../../types';

describe('SelectedGamePopup', () => {
  const mockStore = configureStore();

  it('correctly renders SelectedGamePopup with correct data', () => {
    const fakeGame: Game = {
      CategorySections: [{ Name: 'fakeCategory' }],
      GameFiles: [{ FileName: 'fakefile.exe' }],
      Name: 'Sample Game',
      Slug: 'sample-game',
      SupportsAddons: true,
      SupportsVoice: true,
    } as Game;

    const initialState = {
      results: {
        selectedGame: fakeGame,
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

  // it('correctly renders SelectedGamePopup but with no categories or files', () => {
  //   // const fakeGame: Game = {
  //   //   CategorySections: [],
  //   //   GameFiles: [],
  //   //   Name: 'Sample Game',
  //   //   Slug: 'sample-game',
  //   //   SupportsAddons: true,
  //   //   SupportsVoice: true,
  //   //   AddOnSettingsFileFilter: '',
  //   //   AddOnSettingsFileRemovalFilter: '',
  //   //   AddOnSettingsFolderFilter: '',
  //   //   AddOnSettingsStartingFolder: '',
  //   // };

  //   const initialState = {
  //     results: {
  //       selectedGame: fakeGame,
  //     },
  //   };

  //   const store = mockStore(initialState);

  //   render(
  //     <Provider store={store}>
  //       <SelectedGamePopup />
  //     </Provider>,
  //   );

  //   expect(screen.getByText('Add-Ons')).toBeInTheDocument();
  //   expect(screen.getByText('Voice Support')).toBeInTheDocument();
  //   expect(screen.getByText('Categories')).toBeInTheDocument();
  //   expect(screen.getByText('No Categories')).toBeInTheDocument();
  //   expect(screen.getByText('Files')).toBeInTheDocument();
  //   expect(screen.getByText('No Files')).toBeInTheDocument();
  //   expect(screen.getByText('Slug')).toBeInTheDocument();
  //   expect(screen.getByText('sample-game')).toBeInTheDocument();
  //   expect(screen.getByText('Go Back')).toBeInTheDocument();
  // });
});

// const fakeGame: Game = {
//   AddOnSettingsFileFilter: '*.zip',
//   AddOnSettingsFileRemovalFilter: '*.tmp',
//   AddOnSettingsFolderFilter: 'bin',
//   AddOnSettingsStartingFolder: 'addons',
//   Assets: [],
//   BundleAssets: true,
//   CategorySections: [],
//   DateModified: '2023-01-01T00:00:00Z',
//   FileParsingRules: [],
//   GameDetectionHints: [],
//   GameFiles: [],
//   ID: 1,
//   MaxFileSize: 1024 * 1024 * 100, // 100 MB
//   MaxFreeStorage: 1024 * 1024 * 1024 * 5, // 5 GB
//   MaxPremiumStorage: 1024 * 1024 * 1024 * 10, // 10 GB
//   Name: 'Fake Game',
//   Order: 1,
//   ProfilerAddOnId: 12345,
//   Slug: 'fake-game',
//   SupportsAddons: true,
//   SupportsNotifications: true,
//   SupportsVoice: false,
//   TwitchGameId: 98765,
// };
