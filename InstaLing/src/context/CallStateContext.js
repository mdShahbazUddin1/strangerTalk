import {useState} from 'react';

export const CallStateProvider = ({children}) => {
  const [connectedUsers, setConnectedUsers] = useState(0);

  const handleUserConnect = () => {
    setConnectedUsers(prevCount => prevCount + 1);
  };

  const handleUserDisconnect = () => {
    setConnectedUsers(prevCount => prevCount - 1);
  };

  return (
    <CallStateContext.Provider
      value={{
        callState: connectedUsers === 2,
        handleUserConnect,
        handleUserDisconnect,
      }}>
      {children}
    </CallStateContext.Provider>
  );
};
