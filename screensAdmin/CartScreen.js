
import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../contexts/CartContext';
import { getCartStyles } from '../stylesAdmin/cartStyles';
import { useTheme } from '../contexts/ThemeContext'; // ✅ importa o contexto

export default function CartScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);
  const { isDarkMode} = useTheme();
  const styles = getCartStyles(isDarkMode);

  // Calcula total
  const total = cart.reduce((sum, item) => {
    const precoNumerico = typeof item.preco === 'string' 
      ? parseFloat(item.preco) 
      : item.preco;
    return sum + (precoNumerico || 0);
  }, 0);

  // Função para finalizar pedido e salvar no histórico
  const handlePayment = async () => {
    if (cart.length === 0) return;

    const now = new Date();
    const order = {
      id: Date.now(),
      itens: cart,
      valor: total.toFixed(2),
      data: now.toLocaleDateString(),
      hora: now.toLocaleTimeString(),
      status: 'Concluído'
    };

    try {
      const existingOrders = await AsyncStorage.getItem('orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));

      clearCart(); // limpa carrinho
      navigation.navigate('OrdersHistoryScreen'); // vai para histórico
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={styles.title}>Carrinho</Text>
      </View>

      {/* Lista de itens */}
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={{color: '#999', textAlign: 'center'}}>Seu carrinho está vazio.</Text>}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.nome}:{'\n'} R$ {item.preco ? item.preco.toFixed(2) : '0.00'}
          <TouchableOpacity style={styles.modalCloseCart} onPress={() => clearCart() } >
          <Text style={{ fontSize: 18 }}>✖</Text>
          </TouchableOpacity>
          </Text>
        )}
      />

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pagamento', { total })}>

        <Text style={styles.buttonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      {/* Botão Limpar Carrinho */}
      <TouchableOpacity style={styles.buttonSecondary} onPress={clearCart}>
        <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#555' }]}>
          Limpar Carrinho
        </Text>
      </TouchableOpacity>
    </View>
  );
}
