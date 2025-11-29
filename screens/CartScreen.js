import React, { useContext } from 'react';
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../contexts/CartContext';
import { getCartStyles } from '../styles/cartStyles';
import { useTheme } from '../contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUserContext } from '../contexts/UserContext'; // 🔹 Importa o contexto do usuário

export default function CartScreen({ navigation }) {
  const { cart, clearCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { isDarkMode } = useTheme();
  const styles = getCartStyles(isDarkMode);

  const { saldo, setSaldo } = useUserContext(); // 🔹 pega saldo e função para atualizar

  const total = cart.reduce((sum, item) => {
    const precoNumerico = typeof item.preco === 'string'
      ? parseFloat(item.preco)
      : item.preco;
    const quantidade = item.quantidade || 1;
    return sum + (precoNumerico * quantidade || 0);
  }, 0);

  const handlePayment = async () => {
    if (cart.length === 0) return;

    // 🔹 Verifica se o usuário tem saldo suficiente
    if (saldo < total) {
      Alert.alert("Saldo insuficiente", "Você não possui saldo suficiente para esta compra.");
      return;
    }

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

      // 🔹 Subtrai o valor da compra do saldo
      setSaldo((prevSaldo) => prevSaldo - total);

      clearCart();
      Alert.alert("Sucesso", "Compra realizada com sucesso!", [
        { text: "OK" }
      ]);
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

      <FlatList
        data={cart}
        keyExtractor={(item, index) => item.id + index.toString()}
        ListEmptyComponent={<Text style={{ color: '#999', textAlign: 'center' }}>Seu carrinho está vazio.</Text>}
        renderItem={({ item, index }) => {
          const precoNumerico = typeof item.preco === 'string'
            ? parseFloat(item.preco)
            : item.preco;
          const quantidade = item.quantidade || 1;
          const precoTotal = precoNumerico * quantidade;

          return (
            <View style={styles.itemContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemText}>
                  <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
                  {'\n'}
                  R$ {precoNumerico.toFixed(2)} x {quantidade}
                  {'\n'}
                  <Text style={{ fontWeight: '600' }}>Total: R$ {precoTotal.toFixed(2)}</Text>
                </Text>
              </View>

              {/* Controles de quantidade */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, Math.max(1, quantidade - 1))}>
                  <Text style={{ fontSize: 18, color: isDarkMode ? '#fff' : '#000', paddingHorizontal: 8 }}>−</Text>
                </TouchableOpacity>
                <Text style={{ color: isDarkMode ? '#fff' : '#000', minWidth: 20, textAlign: 'center' }}>{quantidade}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, quantidade + 1)}>
                  <Text style={{ fontSize: 18, color: isDarkMode ? '#fff' : '#000', paddingHorizontal: 8 }}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}>
                <Ionicons name="trash-bin-outline" size={24} color={isDarkMode ? '#ff6b6b' : '#ff0000'} />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert(
          "Finalizar Pedido",
          "Você tem certeza disto?",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Pagar", onPress: () => handlePayment() }
          ]
        )}
      >
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
