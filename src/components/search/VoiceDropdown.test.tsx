import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import VoiceDropdown from './VoiceDropdown';
import { RootState } from '../../state/store';
import '@testing-library/jest-dom';

const mockStore = configureStore<Partial<RootState>>();

const options: string[] = ['-', 'Yes', 'No'];

describe('VoiceDropdown', () => {
  it('renders the dropdown with default value correctly', () => {
    const store = mockStore({
      search: {
        nameInput: '',
        addonsDropdown: '-',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    });

    render(
      <Provider store={store}>
        <VoiceDropdown />
      </Provider>,
    );

    expect(screen.getByText('Voice Support')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByTestId('voice-chevron-icon')).toBeInTheDocument();
  });

  options.forEach(option => {
    it(`allows the user to select option "${option}"`, async () => {
      const store = mockStore({
        search: {
          nameInput: '',
          addonsDropdown: option,
          voiceDropdown: '-',
          sortDropdown: 'Order',
        },
      });

      render(
        <Provider store={store}>
          <VoiceDropdown />
        </Provider>,
      );

      userEvent.click(screen.getByTestId('voice-chevron-icon'));
      const optionElement = await screen.findByText(option);
      userEvent.click(optionElement);
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});