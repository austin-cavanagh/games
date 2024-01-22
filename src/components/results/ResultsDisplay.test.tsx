import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ResultsDisplay from './ResultsDisplay';

const mockStore = configureStore();

describe('ResultsDisplay Component', () => {
  const store = mockStore({
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
  });

  it('renders fallback image when the main image fails to load', () => {
    render(
      <Provider store={store}>
        <ResultsDisplay />
      </Provider>,
    );

    // Find the image of the first game
    const image = screen.getByAltText('', { selector: 'img' }); // Adjust selector as necessary

    // Simulate an error loading the image
    fireEvent.error(image);

    // Check if the src attribute of the image is changed to the fallback image
    expect(image).toHaveAttribute('src', '../../../images/no-image.png');
  });
});
