// actions.js
export const HANG_UP_CALL = 'HANG_UP_CALL';
export const SET_CALL_STATUS = 'SET_CALL_STATUS';
export const SET_APP_BACKGROUND = 'SET_APP_BACKGROUND';
export const RANDOM_USER_DISCONNECTED = 'RANDOM_USER_DISCONNECTED';

export const hangUpCall = () => ({
  type: HANG_UP_CALL,
});

export const setCallStatus = isActive => ({
  type: SET_CALL_STATUS,
  payload: isActive,
});

export const setAppBackground = isBackground => ({
  type: SET_APP_BACKGROUND,
  payload: isBackground,
});

export const randomUserDisconnected = () => ({
  type: RANDOM_USER_DISCONNECTED,
});
