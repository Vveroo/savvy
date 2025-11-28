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
import { useTheme } from '../contexts/ThemeContext';
import { useCardapio } from '../contexts/CardapioContext';

const categorias = ['Lanches', 'Bebidas', 'Doces', 'Favoritos'];

export default function CardapioScreen() {
  const { produtos } = useCardapio();   // ✅ Agora está dentro do componente
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
      {/* ... resto do código igual ao que você já fez */}
    </View>
  );
}
