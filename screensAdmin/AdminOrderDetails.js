import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons'; 
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
      
      if (newStatus === 'Cancelado') {
        Alert.alert('Cancelado', 'Pedido cancelado e removido da tela.');
      } else if (newStatus === 'Concluído') {
        Alert.alert('Concluído', 'Pedido concluído e removido da tela.');
      } else {
        Alert.alert('Sucesso', 'Status atualizado para: ' + newStatus);
      }

    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  const activeOrders = orders.filter(
    order => order.status !== 'Concluído' && order.status !== 'Cancelado'
  );

  const renderOrder = ({ item }) => (
    <View style={styles.card}> 
      <Text style={styles.title}>Pedido #{item.id}</Text>
      <Text style={styles.subtitle}>Status: {String(item.status)}</Text>

      <FlatList
        data={item.items || []}
        keyExtractor={(it, i) => (it.id ? it.id.toString() : i.toString())}
        renderItem={({ item: product }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{String(product.nome)}</Text>
            <Text style={styles.itemQty}>x{product.quantidade || 1}</Text>
            <Text style={styles.itemPrice}>R$ {(product.preco || 0).toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {typeof item.total === 'number' ? item.total.toFixed(2) : '0.00'}</Text>

      <View style={styles.actionsRow}>
        
        
        {String(item.status) === 'Aguardando preparo' && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#FFA500' }]} 
            onPress={() => updateStatus(item.id, 'Preparando')}
          >
            <Text style={styles.actionText}>Em Preparo</Text>
          </TouchableOpacity>
        )}
        
        
        {String(item.status) === 'Preparando' && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]} 
            onPress={() => updateStatus(item.id, 'Concluído')}
          >
            <Text style={styles.actionText}>Concluído</Text>
          </TouchableOpacity>
        )}
        
        
        {(String(item.status) === 'Aguardando preparo' || String(item.status) === 'Preparando') && (
          <TouchableOpacity
            style={[styles.actionButton, styles.trashButton]}
            onPress={() => updateStatus(item.id, 'Cancelado')}
          >
            <Icon name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pedidos Ativos</Text>
      <FlatList
        data={activeOrders} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pedido ativo no momento.</Text>}
      />
    </View>
  );
}
