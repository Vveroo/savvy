import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { styles } from '../styles/cardapioStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const produtos = [
  { id: '1', nome: 'Hambúrguer', preco: 25.0, categoria: 'Lanches' },
  { id: '2', nome: 'Pizza', preco: 40.0, categoria: 'Lanches' },
  { id: '3', nome: 'Refrigerante', preco: 8.0, categoria: 'Bebidas' },
  { id: '4', nome: 'Pão de queijo', preco: 3.5, categoria: 'Lanches' },
  { id: '5', nome: 'Calzone', preco: 5.0, categoria: 'Lanches' },
  { id: '6', nome: 'Fatia de Bolo', preco: 6.0, categoria: 'Doces' },

];

const categorias = ['Lanches', 'Bebidas', 'Doces', 'Favoritos'];

export default function CardapioScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const [busca, setBusca] = useState('');
  const [categoriaIndex, setCategoriaIndex] = useState(0);
  const scrollRef = useRef(null);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const adicionarAoCarrinho = (item) => {
    console.log('Adicionado ao carrinho:', item.nome);
  };

  const getProdutosPorCategoria = (categoria) => {
    return produtos.filter((item) => {
      const nomeMatch = item.nome.toLowerCase().includes(busca.toLowerCase());
      const categoriaMatch =
        categoria === 'Favoritos'
          ? favoritos.includes(item.id)
          : item.categoria === categoria;
      return nomeMatch && categoriaMatch;
    });
  };

  const scrollToCategoria = (index) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setCategoriaIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>

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
              onPress={() => scrollToCategoria(index)}
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

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCategoriaIndex(index);
        }}
        style={{ flex: 1 }}
      >
        {categorias.map((cat) => {
          const produtosFiltrados = getProdutosPorCategoria(cat);
          return (
            <View key={cat} style={{ width }}>
              <View style={styles.grid}>
                {Array.from({ length: 6 }).map((_, i) => {
                  const item = produtosFiltrados[i];
                  return (
                    <TouchableOpacity
                      key={item?.id || `empty-${i}`}
                      style={styles.card}
                      onPress={() =>
                        item && console.log('Card pressionado:', item.nome)
                      }
                      activeOpacity={item ? 0.8 : 1}
                    >
                      {item ? (
                        <>
                          <Text style={styles.nome}>{item.nome}</Text>
                          <Text style={styles.preco}>
                            R$ {item.preco.toFixed(2)}
                          </Text>
                          <View style={styles.cardButtons}>
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

                            <TouchableOpacity
                              style={styles.cartButton}
                              onPress={() => adicionarAoCarrinho(item)}
                            >
                              <Text style={styles.cartText}>🛒</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.carrinhoButton}>
        <Icon name="cart-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
