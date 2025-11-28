// contexts/CardapioContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { produtos as initialProdutos } from '../utils/mockData';

const CardapioContext = createContext();

export function CardapioProvider({ children }) {
  const [produtos, setProdutos] = useState(initialProdutos);

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('@cardapio');
        if (saved) {
          setProdutos(JSON.parse(saved));
        }
      } catch (e) {
        console.log('Erro ao carregar cardápio', e);
      }
    };
    loadData();
  }, []);

  // Salvar sempre que produtos mudar
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('@cardapio', JSON.stringify(produtos));
      } catch (e) {
        console.log('Erro ao salvar cardápio', e);
      }
    };
    saveData();
  }, [produtos]);

  return (
    <CardapioContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </CardapioContext.Provider>
  );
}

export function useCardapio() {
  return useContext(CardapioContext);
}
