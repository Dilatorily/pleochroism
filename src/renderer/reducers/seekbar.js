const SEEK = 'pleochroism/seekbar/SEEK';
const RESET = 'pleochroism/seekbar/RESET';

const INITIAL_STATE = {
  progress: 0,
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SEEK:
      return { progress: action.payload };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const changeSeekbar = progress => ({ type: SEEK, payload: progress });
export const resetSeekbar = () => ({ type: RESET });
