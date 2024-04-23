import {
  HANG_UP_CALL,
  SET_APP_BACKGROUND,
  RANDOM_USER_DISCONNECTED,
} from './actions';

const initialState = {
  callActive: true,
  isBackground: false,
};

const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANG_UP_CALL:
      return {
        ...state,
        callActive: false,
      };
    case 'SET_CALL_ACTIVE':
      return {
        ...state,
        callActive: action.payload,
      };
    case SET_APP_BACKGROUND:
      return {
        ...state,
        isBackground: action.payload,
      };
    case RANDOM_USER_DISCONNECTED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default callReducer;
