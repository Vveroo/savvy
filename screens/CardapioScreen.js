import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../styles/cardapioStyles';

const produtos = [
  { id: '1', nome: 'Hambúrguer', preco: 25.0, },
  { id: '2', nome: 'Pizza', preco: 40.0, },
  { id: '3', nome: 'Refrigerante', preco: 8.0,  },
  { id: '4', nome: 'Pão de queijo', preco: 3.5, },
  { id: '5', nome: 'Calzone', preco: 5.0, },
  { id: '6', nome: 'Fatia de Bolo', preco: 6.0, },
];

export default function CardapioScreen() {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.image} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
      <TouchableOpacity
        style={[
          styles.favButton,
          favoritos.includes(item.id) && styles.favAtivo,
        ]}
        onPress={() => toggleFavorito(item.id)}
      >
        <Text style={styles.favText}>
          {favoritos.includes(item.id) ? '★ Favorito' : '☆ Favoritar'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
