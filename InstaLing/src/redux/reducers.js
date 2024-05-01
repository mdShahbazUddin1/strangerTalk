import {UPDATE_CALL_DURATION} from './actions';

const initialState = {
  callDuration: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CALL_DURATION:
      return {
        ...state,
        callDuration: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
