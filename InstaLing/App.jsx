import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/redux/reducers'; // Assuming you have a root reducer defined
import StackNavigator from './src/navigation/StackNavigator';

// Create your Redux store
const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
