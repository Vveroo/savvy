// contexts/CardapioContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { produtos as mockProdutos } from '../utils/mockData';

const CardapioContext = createContext();

export function CardapioProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Carregar produtos salvos ao iniciar (com mockData como padrão)
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const data = await AsyncStorage.getItem('@cardapio');
        if (data) {
          // Se já existe no AsyncStorage, carrega dali
          setProdutos(JSON.parse(data));
        } else {
          // Se é primeira vez, usa mockData e salva
          setProdutos(mockProdutos);
          await AsyncStorage.setItem('@cardapio', JSON.stringify(mockProdutos));
        }
      } catch (error) {
        console.log('Erro ao carregar produtos:', error);
        // Fallback para mockData em caso de erro
        setProdutos(mockProdutos);
      }
      setInitialized(true);
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
    const produtoComId = {
      ...novoProduto,
      id: novoProduto.id || Date.now().toString(),
    };
    setProdutos((prev) => [...prev, produtoComId]);
  };

  // Função para editar item
  const editProduto = (id, produtoAtualizado) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...produtoAtualizado } : p))
    );
  };

  // Função para deletar item
  const deleteProduto = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  // Função para limpar cardápio (reseta para mockData)
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

// Alias para compatibilidade com código antigo
export function useCardapio() {
  return useContext(CardapioContext);
}
