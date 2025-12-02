// contexts/CardapioContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { produtos as mockProdutos } from '../utils/mockData';

const CardapioContext = createContext();

export function CardapioProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const data = await AsyncStorage.getItem('@cardapio');
        if (data) {
          setProdutos(JSON.parse(data));
        } else {
          setProdutos(mockProdutos);
          await AsyncStorage.setItem('@cardapio', JSON.stringify(mockProdutos));
        }
      } catch (error) {
        console.log('Erro ao carregar produtos:', error);
        setProdutos(mockProdutos);
      }
      setInitialized(true);
    };
    carregarProdutos();
  }, []);

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

  const addProduto = (novoProduto) => {
    const produtoComId = {
      ...novoProduto,
      id: novoProduto.id || Date.now().toString(),
    };
    setProdutos((prev) => [...prev, produtoComId]);
  };

  const editProduto = (id, produtoAtualizado) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...produtoAtualizado } : p))
    );
  };

  const deleteProduto = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const resetCardapio = async () => {
    setProdutos(mockProdutos);
    await AsyncStorage.setItem('@cardapio', JSON.stringify(mockProdutos));
  };

  return (
    <CardapioContext.Provider
      value={{
        produtos,
        setProdutos,
        addProduto,
        editProduto,
        deleteProduto,
        resetCardapio,
        initialized,
      }}
    >
      {children}
    </CardapioContext.Provider>
  );
}

export function useCardapioContext() {
  return useContext(CardapioContext);
}

export function useCardapio() {
  return useContext(CardapioContext);
}
