import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { getCardapioStyles } from '../styles/cardapioStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';
import { produtos } from '../utils/mockData';
import { useTheme } from '../contexts/ThemeContext';

const categorias = ['Lanches', 'Bebidas', 'Doces', 'Favoritos'];

export default function CardapioScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const [busca, setBusca] = useState('');
  const [categoriaIndex, setCategoriaIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantidade, setQuantidade] = useState(1);

  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const { isDarkMode } = useTheme();
  const styles = getCardapioStyles(isDarkMode);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // 🔧 Busca independente da categoria
  const getProdutosFiltrados = () => {
    return produtos.filter((item) => {
      const nomeMatch = item.nome.toLowerCase().includes(busca.toLowerCase());
      if (busca) return nomeMatch; // se tem busca, ignora categoria
      const categoriaMatch =
        categorias[categoriaIndex] === 'Favoritos'
          ? favoritos.includes(item.id)
          : item.categoria === categorias[categoriaIndex];
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

      {/* Categorias */}
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
                categoriaIndex === index && styles.categoriaAtiva,
              ]}
              onPress={() => setCategoriaIndex(index)}
            >
              <Text
                style={[
                  styles.categoriaText,
                  categoriaIndex === index && styles.categoriaTextAtiva,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de produtos */}
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.grid}>
          {produtosFiltrados.map((item) => (
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

              {/* preço embaixo do nome, lado esquerdo */}
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

              {/* botão favorito canto direito */}
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
          ))}
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
                R$ {selectedItem.preco.toFixed(2)}
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
                  for (let i = 0; i < quantidade; i++) {
                    addToCart(selectedItem);
                  }
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cartText}>Adicionar ao carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
