import React, { useContext } from 'react';
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabaseClient';
import { CartContext } from '../contexts/CartContext';
import { getCartStyles } from '../styles/cartStyles';
import { useTheme } from '../contexts/ThemeContext';
import { useUserContext } from '../contexts/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CartScreen({ navigation }) {
  const { cart, clearCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { isDarkMode } = useTheme();
  const styles = getCartStyles(isDarkMode);
  const { saldo, setSaldo, user } = useUserContext();

  const total = cart.reduce((sum, item) => {
    const precoNumerico = typeof item.preco === 'string'
      ? parseFloat(item.preco)
      : item.preco;
    const quantidade = item.quantidade || 1;
    return sum + (precoNumerico * quantidade || 0);
  }, 0);

  const handlePayment = async () => {
    if (cart.length === 0) return;

    if (saldo < total) {
      Alert.alert("Saldo insuficiente", "Você não possui saldo suficiente para esta compra.");
      return;
    }

    const now = new Date();
    const userMatricula = await AsyncStorage.getItem('userMatricula');
    const userId = await AsyncStorage.getItem('userId');

    // Build local order object (used for AsyncStorage fallback and UI)
    const localOrder = {
      id: Date.now(),
      usuario: userMatricula || 'Usuário',
      items: cart,
      total: total,
      data: now.toLocaleDateString(),
      hora: now.toLocaleTimeString(),
      status: 'Aguardando preparo'
    };

    try {
      // Try to insert into Supabase first (if userId available)
      let pedidoInsertResult = null;
      if (userId) {
        const pedidoPayload = {
          usuario_id: userId,
          total: total,
          status: 'Aguardando preparo'
        };

        const { data: pedidoData, error: pedidoError } = await supabase
          .from('pedidos')
          .insert(pedidoPayload)
          .select();

        if (pedidoError) {
          console.warn('Supabase: erro ao inserir pedido:', pedidoError.message || pedidoError);
        } else if (pedidoData && pedidoData.length > 0) {
          // pedidoData may be an array depending on Supabase client version
          pedidoInsertResult = pedidoData[0];
        }
      }

      // If Supabase insert succeeded, insert items linked to pedido id
      if (pedidoInsertResult && pedidoInsertResult.id) {
        const pedidoId = pedidoInsertResult.id;
        const itemsPayload = cart.map((it) => ({
          pedido_id: pedidoId,
          produto_id: it.id || null,
          nome: it.nome || '',
          preco: typeof it.preco === 'string' ? parseFloat(it.preco) : it.preco || 0,
          quantidade: it.quantidade || 1
        }));

        const { error: itensError } = await supabase.from('itens_pedidos').insert(itemsPayload);
        if (itensError) {
          console.warn('Supabase: erro ao inserir itens_pedidos:', itensError.message || itensError);
        }

        // Optional: update local cache as well
        const existingOrders = await AsyncStorage.getItem('orders');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.push({ ...localOrder, id: pedidoInsertResult.id, created_at: pedidoInsertResult.created_at });
        await AsyncStorage.setItem('orders', JSON.stringify(orders));

        // remove any pending local flags
        const existingPending = await AsyncStorage.getItem('pendingOrders');
        const pendingOrders = existingPending ? JSON.parse(existingPending) : [];
        pendingOrders.push(localOrder);
        await AsyncStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
      } else {
        // Supabase insertion not possible or failed — fallback to AsyncStorage
        const existingOrders = await AsyncStorage.getItem('orders');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.push(localOrder);
        await AsyncStorage.setItem('orders', JSON.stringify(orders));

        const existingPending = await AsyncStorage.getItem('pendingOrders');
        const pendingOrders = existingPending ? JSON.parse(existingPending) : [];
        pendingOrders.push(localOrder);
        await AsyncStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
      }

      // Update local saldo and UI
      setSaldo((prevSaldo) => prevSaldo - total);
      clearCart();

      Alert.alert("Sucesso", "Compra realizada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            navigation.reset({
              index: 1,
              routes: [
                { name: 'MainTabs', params: { screen: 'Pedidos' } },
              ],
            });
          }
        }
      ]);
    } catch (error) {
      console.error('Erro ao processar pedido (supabase/async fallback):', error);
      // final fallback: save locally
      try {
        const existingOrders = await AsyncStorage.getItem('orders');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.push(localOrder);
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (e) {
        console.error('Erro ao salvar pedido em AsyncStorage no fallback:', e);
      }
      Alert.alert("Erro", "Erro ao processar pedido");
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
