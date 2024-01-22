import searchReducer, {
  setNameInput,
  setAddonsDropdown,
  setVoiceDropdown,
  setSortDropdown,
} from './searchSlice';

const initialState = {
  nameInput: '',
  addonsDropdown: '-',
  voiceDropdown: '-',
  sortDropdown: 'Order',
};

describe('reducers and actions', () => {
  it('should handle setNameInput', () => {
    const action = setNameInput('testing testing');
    const newState = searchReducer(initialState, action);
    expect(newState.nameInput).toEqual('testing testing');
  });

  it('should handle setAddonsDropdown', () => {
    const action = setAddonsDropdown('Yes');
    const newState = searchReducer(initialState, action);
    expect(newState.addonsDropdown).toEqual('Yes');
  });

  it('should handle setVoiceDropdown', () => {
    const action = setVoiceDropdown('Yes');
    const newState = searchReducer(initialState, action);
    expect(newState.voiceDropdown).toEqual('Yes');
  });

  it('should handle setSortDropdown', () => {
    const action = setSortDropdown('A-Z');
    const newState = searchReducer(initialState, action);
    expect(newState.sortDropdown).toEqual('A-Z');
  });
});
