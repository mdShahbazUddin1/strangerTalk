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
      console.log('history saved');
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
    const response = await fetch(`${BASE_URL}/auth/getsingleuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data.getUser;
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
      `${BASE_URL}/feedback/getfeedbackofrandom/${receiver_user_id}`,
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
    const response = await fetch(`${BASE_URL}/feedback/getgivenfeedback`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
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

export const saveFollowNotification = async targetUserId => {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(
      `${BASE_URL}/notification/save/${targetUserId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      // console.log('Follow notification saved successfully:', data.success);
      return data; // Return data if request is successful
    } else {
      throw new Error('Failed to save follow notification');
    }
  } catch (error) {
    console.error('Error saving follow notification:', error);
    throw error; // Throw error if request fails
  }
};

export const fetchNotifications = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      return;
    }

    const response = await fetch(`${BASE_URL}/notification/getnoti`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('Notifications fetched successfully:', data);
      return data;
    } else {
      console.error('Failed to fetch notifications:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

export const markNotificationSeen = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/notification/markseen`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Notifications fetched successfully:', data);
      return data;
    } else {
      console.error('Failed to fetch notifications:');
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

export const sendCallNotification = async receiverUserId => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(
      `${BASE_URL}/notification/call/${receiverUserId}`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log('Call Notification Send Successfully:', data);
      return data;
    } else {
      console.error('Failed to fetch notifications:');
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

export const getCallNotification = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/notification/getcall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('You Got New Call', data.recentCallNotifications);
      return data.recentCallNotifications;
    } else {
      throw new Error('Failed to fetch notifications: call');
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // rethrow the error to be caught by the caller
  }
};

export const sendOtp = async (username, email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sendotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, otp}),
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error; // Propagate the error for handling by the caller
  }
};
export const sendPassOtp = async email => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sendpasswordotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error; // Propagate the error for handling by the caller
  }
};

export const verifyOtp = async otp => {
  try {
    const response = await fetch(`${BASE_URL}/auth/verifyotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({otp}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify OTP');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error; // Propagate the error for handling by the caller
  }
};

export const unfollowUser = async userIdToUnfollow => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(
      `${BASE_URL}/auth/unfollow/${userIdToUnfollow}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log('User unfollowed successfully:', data);
      return data;
    } else {
      const errorData = await response.json();
      console.error('Failed to unfollow user:', errorData.message);
    }
  } catch (error) {
    console.error('Error unfollowing user:', error);
  }
};

export const getFriendsList = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await fetch(`${BASE_URL}/auth/friendlist`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error('Failed to getfriend list:', errorData.msg);
    }
  } catch (error) {
    console.log(error);
  }
};
