import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const saveToken = (newToken) => {
    setToken(newToken);
    // Você pode salvar no AsyncStorage se quiser persistência
  };

  const saveUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // Limpar dados persistidos, se houver
  };

  return (
    <AuthContext.Provider value={{ token, user, saveToken, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
