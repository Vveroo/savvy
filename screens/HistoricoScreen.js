import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrdersHistoryScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await AsyncStorage.getItem('orders');
      if (data) setOrders(JSON.parse(data));
    };
    fetchOrders();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Histórico de Pedidos</Text>
      {orders.map((order, index) => (<Text key={index}>{order}</Text>))}
    </View>
  );
}

[/*(const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },

  empty: {
    marginTop: 30,
    fontSize: 16,
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  cardText: {
    fontSize: 16,
    color: "#444",
  },
});
)*/]