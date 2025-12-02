
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabaseClient';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [saldo, setSaldo] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (identifier, password) => {
    setIsLoading(true);
    try {
      console.log('SignIn iniciado com:', identifier);
      
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .or(`matricula.eq.${identifier},email.eq.${identifier}`)
        .limit(1);

      console.log('Resposta Supabase:', { userData, userError });

      if (userError || !userData || userData.length === 0) {
        console.log('Usuário não encontrado');
        setIsLoading(false);
        return { success: false, error: 'Usuário não encontrado' };
      }

      const u = userData[0];
      console.log('Usuário encontrado:', u.matricula);
      
      if (u.senha !== password && u.senha_hash !== password) {
        console.log('Senha incorreta');
        setIsLoading(false);
        return { success: false, error: 'Senha incorreta' };
      }

      console.log('Login bem-sucedido');
      setUser(u);
      setSaldo(parseFloat(u.saldo) || 0.0);
      await AsyncStorage.setItem('userMatricula', u.matricula);
      await AsyncStorage.setItem('userId', u.id.toString());
      setToken(`token-${u.id}`);
      
      setIsLoading(false);
      return { success: true, user: u };
    } catch (err) {
      console.error('Erro signIn:', err);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const loginLocal = async (matricula, role) => {
    setIsLoading(true);
    try {
      console.log('Login local iniciado com:', matricula);
      
      const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };

      const mockUser = {
        id: generateUUID(),
        matricula,
        nome: matricula,
        role,
        saldo: 100.0,
        email: `${matricula}@test.com`
      };

      setUser(mockUser);
      setSaldo(100.0);
      await AsyncStorage.setItem('userMatricula', matricula);
      await AsyncStorage.setItem('userId', mockUser.id.toString());
      setToken(`token-${mockUser.id}`);

      setIsLoading(false);
      return { success: true, user: mockUser };
    } catch (err) {
      console.error('Erro loginLocal:', err);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setSaldo(0.0);
    await AsyncStorage.removeItem('userMatricula');
    await AsyncStorage.removeItem('userId');
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        signIn,
        loginLocal,
        logout,
        saldo,
        setSaldo,
        isLoading,
        setIsLoading,
        isAuthenticated,
      }}
    >
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
