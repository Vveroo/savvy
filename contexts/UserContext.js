
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Dados do usuário
  const [token, setToken] = useState(null); // Token opcional
  const [saldo, setSaldo] = useState(0.00);
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData, authToken = null) => {
    setUser(userData);
    if (authToken) setToken(authToken);
    setSaldo(userData.saldo || 10.50); // Exemplo
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setSaldo(0.00);
  };

  const isAuthenticated = !!user; // Retorna true se usuário estiver logado

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
