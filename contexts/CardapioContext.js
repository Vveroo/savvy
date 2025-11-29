// contexts/CardapioContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardapioContext = createContext();

export function CardapioProvider({ children }) {
  const [produtos, setProdutos] = useState([]);

  // Carregar produtos salvos ao iniciar
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const data = await AsyncStorage.getItem('@cardapio');
        if (data) {
          setProdutos(JSON.parse(data));
        } else {
          setProdutos([]);
        }
      } catch (error) {
        console.log('Erro ao carregar produtos:', error);
      }
    };
    carregarProdutos();
  }, []);

  // Salvar produtos sempre que mudar
  useEffect(() => {
    const salvarProdutos = async () => {
      try {
        await AsyncStorage.setItem('@cardapio', JSON.stringify(produtos));
      } catch (error) {
        console.log('Erro ao salvar produtos:', error);
      }
    };
    salvarProdutos();
  }, [produtos]);

  // Função para adicionar item
  const addProduto = (novoProduto) => {
    setProdutos((prev) => [...prev, novoProduto]);
  };

  // Função para limpar cardápio
  const resetCardapio = async () => {
    await AsyncStorage.removeItem('@cardapio');
    setProdutos([]);
  };

  return (
    <CardapioContext.Provider value={{ produtos, setProdutos, addProduto, resetCardapio }}>
      {children}
    </CardapioContext.Provider>
  );
}

export function useCardapio() {
  return useContext(CardapioContext);
}
