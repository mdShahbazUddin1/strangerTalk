import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/redux/reducers'; // Assuming you have a root reducer defined
import StackNavigator from './src/navigation/StackNavigator';
// import {firebase} from '@react-native-firebase/app';

// Create your Redux store
const store = createStore(reducer);

// Replace this with your Firebase project configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyBaEdnqEMqsssZdFcHq7SEtfAWwcFMI9a8',
//   authDomain: 'instalingual-b3955.firebaseapp.com',
//   projectId: 'instalingual-b3955',
//   storageBucket: 'instalingual-b3955.appspot.com',
//   messagingSenderId: '811433930245',
//   appId: '1:811433930245:android:a605871d1ca36f3cb2766c',
// };

// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
