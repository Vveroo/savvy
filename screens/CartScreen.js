
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
import { getCartStyles } from '../styles/cartStyles';
import { useTheme } from '../contexts/ThemeContext';

export default function CartScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);
  const { isDarkMode } = useTheme();
  const styles = getCartStyles(isDarkMode);

  const total = cart.reduce((sum, item) => {
    const precoNumerico = typeof item.preco === 'string' 
      ? parseFloat(item.preco) 
      : item.preco;
    return sum + (precoNumerico || 0);
  }, 0);

  const handlePayment = async () => {
    if (cart.length === 0) return;

    const now = new Date();
    const nomeUsuario = await AsyncStorage.getItem('userMatricula'); // quem pediu

    const order = {
      id: Date.now(),
      usuario: nomeUsuario || 'Usuário',
      itens: cart,
      quantidade: cart.length,
      valor: total.toFixed(2),
      data: now.toLocaleDateString(),
      hora: now.toLocaleTimeString(),
      status: 'Aguardando preparo'
    };

    try {
      // Salva no histórico do usuário
      const existingOrders = await AsyncStorage.getItem('orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));

      // Salva também para o Admin ver
      const existingPending = await AsyncStorage.getItem('pendingOrders');
      const pendingOrders = existingPending ? JSON.parse(existingPending) : [];
      pendingOrders.push(order);
      await AsyncStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));

      clearCart();
      navigation.navigate('OrdersHistoryScreen'); // ou tela de confirmação
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
            <TouchableOpacity style={styles.modalCloseCart} onPress={() => clearCart() }>
              <Text style={{ fontSize: 18 }}>✖</Text>
            </TouchableOpacity>
          </Text>
        )}
      />

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}>
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={clearCart}>
        <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#555' }]}>
          Limpar Carrinho
        </Text>
      </TouchableOpacity>
    </View>
  );
}
