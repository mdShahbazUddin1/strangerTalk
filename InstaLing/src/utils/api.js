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

export const getUserProfile = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await fetch(
      `https://stranger-backend.onrender.com/auth/getsingleuser`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    if (response.ok) {
      const data = await response.json();

      return data.getUser; // Return the user data
    } else {
      throw new Error('Failed to fetch user profile');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // Propagate the error to the caller
  }
};

export const getRandomAllFeedBack = async receiver_user_id => {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(
      `https://stranger-backend.onrender.com/feedback/getfeedbackofrandom/${receiver_user_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    );

    if (response.status === 200) {
      const data = await response.json();
      return data.feedback;
    } else {
      throw new Error('Failed to fetch All Feedback');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGivenFeedBack = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await fetch(
      `https://stranger-backend.onrender.com/feedback/getgivenfeedback`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    );
    if (response.status === 200) {
      const data = await response.json();

      return data.feedback;
    } else {
      throw new Error('Failed to fetch All Feedback');
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
