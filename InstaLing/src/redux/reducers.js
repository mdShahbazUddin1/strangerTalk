// reducers.js
import {HANG_UP_CALL} from './actions';

const initialState = {
  callActive: true,
};

const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANG_UP_CALL:
      return {
        ...state,
        callActive: false,
      };
    default:
      return state;
  }
};

export default callReducer;
