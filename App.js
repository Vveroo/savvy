import React from 'react';
import { UserProvider } from './contexts/UserContext';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  return (
    <UserProvider>
      <LoginScreen />
    </UserProvider>
  );
};