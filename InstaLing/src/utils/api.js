import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://stranger-backend.onrender.com'; // Your backend server URL

export const saveCallHistory = async (receiverUserId, call_duration) => {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(`${BASE_URL}/call/history/${receiverUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({call_duration}),
    });

    if (response.ok) {
      const data = await response.json();
      getCallHistory();
      return data; // Return data if request is successful
    } else {
      throw new Error('Failed to save call history');
    }
  } catch (error) {
    throw error; // Throw error if request fails
  }
};

export const getCallHistory = async () => {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(`${BASE_URL}/call/gethistory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.status === 403) {
      console.log('No call history found');
      return [];
    }

    if (response.status === 200) {
      const data = await response.json();
      return data.callHistory;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const disconnectCall = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/auth/disconnect`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 404) {
      console.log('User not found');
    }

    if (response.status === 200) {
      console.log('user disconnected success');
    }
  } catch (error) {
    console.log('Error' + error.message);
  }
};
