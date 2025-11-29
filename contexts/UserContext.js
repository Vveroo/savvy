
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 
  const [saldo, setSaldo] = useState(0.00);
  const [isLoading, setIsLoading] = useState(false);

const login = (userData, authToken = null) => {
  setUser(userData);
  if (authToken) setToken(authToken);


  if (userData.role === 'student'|| userData.role === 'student' || userData.role === 'admin') {
    setSaldo(userData.saldo ?? 0.00);
  } else {
    setSaldo(null); 
  }
};

  const logout = () => {
    setUser(null);
    setToken(null);
    setSaldo(0.00);
  };

  const isAuthenticated = !!user; 

  return (
    <UserContext.Provider value={{
      user,
      token,
      login,
      logout,
      saldo,
      setSaldo,
      isLoading,
      setIsLoading,
      isAuthenticated
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext deve ser usado dentro de um UserProvider');
  }
  return context;
};
