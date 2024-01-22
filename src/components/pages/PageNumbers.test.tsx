import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PageNumbers from './PageNumbers';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
// import { setCurrentPage } from '../../state/slices/resultsSlice';

// Mock setCurrentPage action
// jest.mock('../../state/slices/resultsSlice', () => ({
//   ...jest.requireActual('../../state/slices/resultsSlice'),
//   setCurrentPage: jest.fn(),
// }));

describe('PageNumbers', () => {
  const mockStore = configureStore();

  it('renders component initial state without crashing', () => {
    const store = mockStore({
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
    });

    render(
      <Provider store={store}>
        <PageNumbers />
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  // it('sends action to redux store to change currentPage state', async () => {
  //   const store = mockStore({
  //     results: {
  //       isLoading: true,
  //       isError: false,
  //       currentPage: 1,
  //       loadingProgress: 0,
  //       totalGames: 120,
  //       selectedGame: null,
  //       gamesArray: [],
  //       promptUpdate: false,
  //     },
  //   });

  //   render(
  //     <Provider store={store}>
  //       <PageNumbers />
  //     </Provider>,
  //   );

  //   expect(screen.getByText('1')).toBeInTheDocument();
  //   expect(screen.getByText('2')).toBeInTheDocument();
  //   expect(screen.getByText('3')).toBeInTheDocument();
  //   expect(screen.getByText('4')).toBeInTheDocument();
  //   expect(screen.getByText('5')).toBeInTheDocument();

  //   const pageNumber = screen.getByText('3');

  //   console.log('PAGENUMBER', pageNumber);

  //   userEvent.click(pageNumber);

  //   const expectedPayload = {
  //     type: 'results/setCurrentPage',
  //     payload: expect.anything(),
  //   };

  //   const actions = store.getActions();
  //   console.log(actions);
  //   expect(actions).toContainEqual(expectedPayload);
  // });
});
