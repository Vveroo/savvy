// screens/CardapioScreen.js
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import { getCardapioStyles } from '../styles/cardapioStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCardapio } from '../contexts/CardapioContext';

export default function CardapioScreen() {
  const { produtos } = useCardapio();
  const [favoritos, setFavoritos] = useState([]);
  const [busca, setBusca] = useState('');
  const [categoriaIndex, setCategoriaIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const { addToCart, cartItems } = useContext(CartContext);
  const { isDarkMode } = useTheme();
  const styles = getCardapioStyles(isDarkMode);

  // Função para recarregar produtos
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  // Atualizar automaticamente quando voltar à tela
  useFocusEffect(
    React.useCallback(() => {
      // Força re-render quando a tela ganha foco
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 100);
      return () => {};
    }, [])
  );

  // 🔹 Categorias dinâmicas
  const categorias = Array.isArray(produtos)
    ? [
        ...new Set(produtos.map((item) => item.categoria).filter(Boolean)),
        'Favoritos',
      ]
    : ['Favoritos'];

  // Resetar índice se inválido
  const validaCategoriaIndex = Math.min(categoriaIndex, categorias.length - 1);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const getProdutosFiltrados = () => {
    if (!Array.isArray(produtos) || produtos.length === 0) return [];
    return produtos.filter((item) => {
      const nomeMatch = item?.nome?.toLowerCase().includes(busca.toLowerCase());
      if (busca) return nomeMatch;
      const categoriaMatch =
        categorias[validaCategoriaIndex] === 'Favoritos'
          ? favoritos.includes(item.id)
          : item.categoria === categorias[validaCategoriaIndex];
      return categoriaMatch;
    });
  };

  const produtosFiltrados = getProdutosFiltrados();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>

      {/* Busca */}
      <View style={styles.searchWrapper}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar item..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* Categorias dinâmicas */}
      <View style={{ height: 40 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriasContainer}
        >
          {categorias.map((cat, index) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoriaButton,
                validaCategoriaIndex === index && styles.categoriaAtiva,
              ]}
              onPress={() => setCategoriaIndex(index)}
            >
              <Text
                style={[
                  styles.categoriaText,
                  validaCategoriaIndex === index && styles.categoriaTextAtiva,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de produtos */}
      <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.grid}>
          {produtosFiltrados.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: isDarkMode ? 'white' : 'black' }}>
              Nenhum produto encontrado.
            </Text>
          ) : (
            produtosFiltrados.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                  setQuantidade(1);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.preco}>
                  R$ {Number(item.preco).toFixed(2)}
                </Text>

                {/* botão favorito */}
                <TouchableOpacity
                  style={[
                    styles.favButton,
                    favoritos.includes(item.id) && styles.favAtivo,
                  ]}
                  onPress={() => toggleFavorito(item.id)}
                >
                  <Text style={styles.favText}>
                    {favoritos.includes(item.id) ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal de detalhes */}
      {selectedItem && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ fontSize: 18, color: isDarkMode ? 'white' : 'black' }}>✖</Text>
              </TouchableOpacity>

              <Text style={styles.modalNome}>{selectedItem.nome}</Text>
              <Text style={styles.modalPreco}>
                R$ {Number(selectedItem.preco).toFixed(2)}
              </Text>
              <Text style={styles.modalDescricao}>
                {selectedItem.descricao}
              </Text>

              {/* quantidade */}
              <View style={styles.quantidadeWrapper}>
                <TouchableOpacity
                  style={styles.quantidadeBtn}
                  onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
                >
                  <Text style={styles.quantidadeText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantidadeValor}>{quantidade}</Text>
                <TouchableOpacity
                  style={styles.quantidadeBtn}
                  onPress={() => setQuantidade(quantidade + 1)}
                >
                  <Text style={styles.quantidadeText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* adicionar ao carrinho */}
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => {
                  addToCart(selectedItem, quantidade);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cartText}>Adicionar ao carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Botão flutuante do carrinho */}
      <TouchableOpacity
        style={styles.cartFloatingButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Icon name="cart" size={28} color="white" />
        {Array.isArray(cartItems) && cartItems.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
