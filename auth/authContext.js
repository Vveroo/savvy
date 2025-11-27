
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega dados salvos no AsyncStorage ao iniciar
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUser = await AsyncStorage.getItem('userMatricula');
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(storedUser);
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthData();
  }, []);

  const saveToken = async (newToken) => {
    setToken(newToken);
    await AsyncStorage.setItem('userToken', newToken);
  };

  const saveUser = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('userMatricula', userData);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userMatricula');
  };

  return (
    <AuthContext.Provider value={{ token, user, saveToken, saveUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
