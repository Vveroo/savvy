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

  const refreshSaldo = async () => {
    if (!user || !user.id) return { success: false, error: 'No user' };
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('saldo')
        .eq('id', user.id)
        .limit(1);
      if (error) throw error;
      if (data && data.length > 0) {
        const newSaldo = parseFloat(data[0].saldo) || 0.0;
        setSaldo(newSaldo);
        await AsyncStorage.setItem('userSaldo', newSaldo.toString());
        return { success: true, saldo: newSaldo };
      }
      return { success: false, error: 'No data' };
    } catch (err) {
      console.error('Erro refreshSaldo:', err);
      return { success: false, error: err.message };
    }
  };

  const updateSaldo = async (delta) => {
    const prev = parseFloat(saldo) || 0.0;
    const newSaldo = parseFloat((prev + delta).toFixed(2));
    setSaldo(newSaldo);
    try {
      await AsyncStorage.setItem('userSaldo', newSaldo.toString());
    } catch (e) {
      console.warn('Não foi possível salvar saldo localmente:', e);
    }

    if (user && user.id) {
      try {
        const { error } = await supabase
          .from('usuarios')
          .update({ saldo: newSaldo })
          .eq('id', user.id);
        if (error) throw error;
        return { success: true, saldo: newSaldo };
      } catch (err) {
        console.error('Erro ao atualizar saldo no Supabase:', err);
        setSaldo(prev);
        try { await AsyncStorage.setItem('userSaldo', prev.toString()); } catch (e) {}
        return { success: false, error: err.message };
      }
    }
    return { success: true, saldo: newSaldo };
  };

  const addOrderToHistory = async (orderData) => {
    if (!user || !user.id) {
      console.error("ERRO: Tentativa de salvar pedido sem usuário logado.");
      return { success: false, error: "Usuário não autenticado." };
    }

    const key = `orders_${user.id}`;
    
    const newOrder = { 
        ...orderData, 
        id: Date.now(), 
        data: new Date().toLocaleDateString('pt-BR', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        status: 'Concluído' 
    };

    try {
      const existingData = await AsyncStorage.getItem(key);
      let orders = existingData ? JSON.parse(existingData) : [];
      
      orders.unshift(newOrder); 
      
      await AsyncStorage.setItem(key, JSON.stringify(orders));

      return { success: true, order: newOrder };
    } catch (error) {
      console.error("Erro ao salvar o histórico de pedidos:", error);
      return { success: false, error: error.message };
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
        refreshSaldo,
        updateSaldo,
        addOrderToHistory,
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