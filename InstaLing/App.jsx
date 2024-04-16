import React from 'react';
import {HangUpProvider} from './src/context/HangUpProvider';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  return (
    <HangUpProvider>
      <StackNavigator />
    </HangUpProvider>
  );
};

export default App;
