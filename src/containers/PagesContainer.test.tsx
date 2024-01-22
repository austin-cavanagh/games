import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PagesContainer from './PagesContainer';
import '@testing-library/jest-dom';

const mockStore = configureStore();
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

describe('SearchContainer', () => {
  it('renders components without crashing', () => {
    render(
      <Provider store={store}>
        <PagesContainer />
      </Provider>,
    );

    expect(
      screen.getByText((_, node) => {
        if (!node) return false; // Check if node is not null
        const hasText = (node: Element) =>
          node.textContent === 'Showing 0 to 0 of 0 results';
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child: Element) => !hasText(child),
        );

        return nodeHasText && childrenDontHaveText;
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('pages-left-chevron')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByTestId('pages-right-chevron')).toBeInTheDocument();
  });
});
