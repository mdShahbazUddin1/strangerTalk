import {HANG_UP_CALL} from './actions';

const initialState = {
  callActive: true,
};

const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANG_UP_CALL:
      return {
        ...state,
        callActive: false, // Set callActive to false when call is ended
      };
    case 'SET_CALL_ACTIVE':
      return {
        ...state,
        callActive: action.payload, // Set callActive based on the payload
      };
    default:
      return state;
  }
};

export default callReducer;
