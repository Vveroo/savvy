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
