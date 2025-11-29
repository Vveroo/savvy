import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminDashboardStyles } from '../styles/adminDashboardStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminDashboard({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = getAdminDashboardStyles(isDarkMode);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const load = async () => {
      const pJSON = await AsyncStorage.getItem('pedidos');
      setPedidos(pJSON ? JSON.parse(pJSON) : []);
    };
    load();
  }, []);

  const pendingCount = pedidos.filter(p => p.status !== 'entregue').length;
  const totalCount = pedidos.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Admin</Text>

      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pedidos Pendentes</Text>
          <Text style={styles.cardValue}>{pendingCount}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Pedidos</Text>
          <Text style={styles.cardValue}>{totalCount}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Pedidos Recentes</Text>
      <FlatList
        data={pedidos.slice().reverse().slice(0, 8)}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recentItem}
            onPress={() => navigation.navigate('AdminOrderDetails', { pedidoId: item.id })}
          >
            <Text style={styles.recentTitle}>Pedido #{item.id} - {item.status}</Text>
            <Text style={styles.recentSubtitle}>{item.userMatricula || '—'} • R$ {item.total?.toFixed(2) || '0.00'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
