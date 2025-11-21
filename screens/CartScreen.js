import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ícones do Ionicons
import { CartContext } from '../contexts/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Carrinho</Text>
      </View>

      {/* Lista de itens */}
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - R$ {item.price}
          </Text>
        )}
      />

      <Text style={styles.total}>Total: R$ {total}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pagamento', { total })}
      >
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={clearCart}>
        <Text style={styles.buttonText}>Limpar Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}
