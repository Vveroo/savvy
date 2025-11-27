
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MeusPedidos() {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    const data = await AsyncStorage.getItem('orders');
    setOrders(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido #{item.id}</Text>
      <Text>Data: {item.data} - Hora: {item.hora}</Text>
      <Text>Itens: {item.quantidade}</Text>
      <Text>Valor: R$ {item.valor}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum pedido encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f9f9f9', padding: 15, marginBottom: 15, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  status: { fontWeight: 'bold', color: '#007bff', marginTop: 5 }
});