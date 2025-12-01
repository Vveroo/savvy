
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminPedidos() {
  const [pendingOrders, setPendingOrders] = useState([]);

  // Carrega pedidos pendentes
  const loadOrders = async () => {
    const data = await AsyncStorage.getItem('pendingOrders');
    setPendingOrders(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Atualiza status no Admin e no histórico do estudante
  const updateStatus = async (id, newStatus) => {
    // Atualiza lista do Admin
    const updatedOrders = pendingOrders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setPendingOrders(updatedOrders);
    await AsyncStorage.setItem('pendingOrders', JSON.stringify(updatedOrders));

    // ✅ Atualiza também no histórico do estudante
    const existingUserOrders = await AsyncStorage.getItem('orders');
    if (existingUserOrders) {
      const userOrders = JSON.parse(existingUserOrders);
      const updatedUserOrders = userOrders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      );
      await AsyncStorage.setItem('orders', JSON.stringify(updatedUserOrders));
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido #{item.id}</Text>
      <Text>Cliente: {item.usuario}</Text>
      <Text>Itens: {item.quantidade}</Text>
      <Text>Valor: R$ {item.valor}</Text>
      <Text>Status: {item.status}</Text>
      <View style={styles.actions}>
        {item.status === 'Aguardando preparo' && (
          <TouchableOpacity style={styles.button} onPress={() => updateStatus(item.id, 'Preparando')}>
            <Text style={styles.buttonText}>Preparar</Text>
          </TouchableOpacity>
        )}
        {item.status === 'Preparando' && (
          <TouchableOpacity style={styles.button} onPress={() => updateStatus(item.id, 'Concluído')}>
            <Text style={styles.buttonText}>Concluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pedidos Pendentes</Text>
      <FlatList
        data={pendingOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum pedido pendente.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f9f9f9', padding: 15, marginBottom: 15, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  actions: { flexDirection: 'row', marginTop: 10 },
  button: { backgroundColor: '#007bff', padding: 8, borderRadius: 6, marginRight: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
