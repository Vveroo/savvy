
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminOrderDetailsStyles } from '../stylesAdmin/adminOrderDetailsStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminOrderDetails() {
  const { isDarkMode } = useTheme();
  const styles = getAdminOrderDetailsStyles(isDarkMode);
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await AsyncStorage.getItem('orders');
    setOrders(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const updatedOrders = orders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
      Alert.alert('Sucesso', 'Status atualizado.');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  const renderOrder = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.title}>Pedido #{item.id}</Text>
      <Text style={styles.subtitle}>Status: {item.status}</Text>

      <FlatList
        data={item.items || []}
        keyExtractor={(it, i) => (it.id ? it.id.toString() : i.toString())}
        renderItem={({ item: product }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{product.nome}</Text>
            <Text style={styles.itemQty}>x{product.quantidade || 1}</Text>
            <Text style={styles.itemPrice}>R$ {(product.preco || 0).toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {item.total?.toFixed(2) || '0.00'}</Text>

      <View style={styles.actionsRow}>
        {item.status === 'Aguardando preparo' && (
          <TouchableOpacity style={styles.actionButton} onPress={() => updateStatus(item.id, 'Preparando')}>
            <Text style={styles.actionText}>Preparar</Text>
          </TouchableOpacity>
        )}
        {item.status === 'Preparando' && (
          <TouchableOpacity style={styles.actionButton} onPress={() => updateStatus(item.id, 'Concluído')}>
            <Text style={styles.actionText}>Concluir</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#ff6b6b' }]}
          onPress={() => updateStatus(item.id, 'Cancelado')}
        >
          <Text style={styles.actionText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        ListEmptyComponent={<Text style={styles.subtitle}>Nenhum pedido encontrado.</Text>}
      />
    </View>
  );
}
