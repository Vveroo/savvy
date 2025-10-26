import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../styles/cardapioStyles';

const produtos = [
  { id: '1', nome: 'Hambúrguer', preco: 25.0, imagem: require('../assets/hamburguer.png') },
  { id: '2', nome: 'Pizza', preco: 40.0, imagem: require('../assets/pizza.png') },
  { id: '3', nome: 'Refrigerante', preco: 8.0, imagem: require('../assets/refrigerante.png') },
  
];

export default function CardapioScreen() {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.imagem} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.favButton, favoritos.includes(item.id) && styles.favAtivo]}
          onPress={() => toggleFavorito(item.id)}
        >
          <Text style={styles.favText}>
            {favoritos.includes(item.id) ? '★ Favorito' : '☆ Favoritar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>
      <FlatList data={produtos} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}