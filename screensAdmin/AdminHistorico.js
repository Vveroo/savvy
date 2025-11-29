import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminHistoricoStyles } from '../styles/adminHistoricoStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminHistorico() {
  const { isDarkMode } = useTheme();
  const styles = getAdminHistoricoStyles(isDarkMode);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const load = async () => {
      const pJSON = await AsyncStorage.getItem('pedidos');
      setPedidos(pJSON ? JSON.parse(pJSON) : []);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Pedidos</Text>
      <FlatList
        data={pedidos.slice().reverse()}
        keyExtractor={(p) => p.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Pedido #{item.id} - {item.status}</Text>
            <Text style={styles.rowSub}>R$ {item.total?.toFixed(2) || '0.00'}</Text>
          </View>
        )}
      />
    </View>
  );
}
