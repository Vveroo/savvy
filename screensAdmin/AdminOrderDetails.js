
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminOrderDetailsStyles } from '../stylesAdmin/adminOrderDetailsStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminOrderDetails({ route, navigation }) {
  const { pedidoId } = route.params || {};
  const { isDarkMode } = useTheme();
  const styles = getAdminOrderDetailsStyles(isDarkMode);
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const load = async () => {
      const pJSON = await AsyncStorage.getItem('pedidos');
      const pedidos = pJSON ? JSON.parse(pJSON) : [];
      const found = pedidos.find(p => p.id === pedidoId) || null;
      setPedido(found);
    };
    load();
  }, [pedidoId]);

  const updateStatus = async (newStatus) => {
    try {
      const pJSON = await AsyncStorage.getItem('pedidos');
      const pedidos = pJSON ? JSON.parse(pJSON) : [];
      const idx = pedidos.findIndex(p => p.id === pedidoId);
      if (idx !== -1) {
        pedidos[idx].status = newStatus;
        await AsyncStorage.setItem('pedidos', JSON.stringify(pedidos));
        setPedido(pedidos[idx]);
      }

      const existingUserOrders = await AsyncStorage.getItem('orders');
      if (existingUserOrders) {
        const userOrders = JSON.parse(existingUserOrders);
        const updatedUserOrders = userOrders.map(order =>
          order.id === pedidoId ? { ...order, status: newStatus } : order
        );
        await AsyncStorage.setItem('orders', JSON.stringify(updatedUserOrders));
      }

      Alert.alert('Sucesso', 'Status atualizado.');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  if (!pedido) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pedido não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido #{pedido.id}</Text>
      <Text style={styles.subtitle}>Status: {pedido.status}</Text>

      <FlatList
        data={pedido.items || []}
        keyExtractor={(it, i) => (it.id ? it.id.toString() : i.toString())}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemQty}>x{item.quantidade || 1}</Text>
            <Text style={styles.itemPrice}>R$ {(item.preco || 0).toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {pedido.total?.toFixed(2) || '0.00'}</Text>

      <View style={styles.actionsRow}>
        {pedido.status === 'Aguardando preparo' && (
          <TouchableOpacity style={styles.actionButton} onPress={() => updateStatus('Preparando')}>
            <Text style={styles.actionText}>Preparar</Text>
          </TouchableOpacity>
        )}
        {pedido.status === 'Preparando' && (
          <TouchableOpacity style={styles.actionButton} onPress={() => updateStatus('Concluído')}>
            <Text style={styles.actionText}>Concluir</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#ff6b6b' }]}
          onPress={() => updateStatus('Cancelado')}
        >
          <Text style={styles.actionText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
