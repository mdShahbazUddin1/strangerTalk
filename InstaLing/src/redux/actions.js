// actions.js
export const HANG_UP_CALL = 'HANG_UP_CALL';
export const SET_CALL_STATUS = 'SET_CALL_STATUS';

export const hangUpCall = () => ({
  type: HANG_UP_CALL,
});

export const setCallStatus = isActive => ({
  type: SET_CALL_STATUS,
  payload: isActive,
});
