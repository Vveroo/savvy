import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminDashboardStyles } from '../stylesAdmin/adminDashboardStyles';
import { COLORS } from '../styles/colors';
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
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Icon name="arrow-back-outline" size={22} color={theme.inputText} />
        </TouchableOpacity>
        <Text style={{ color: theme.inputText, marginLeft: 8, fontWeight: '600' }}>Voltar</Text>
      </View>
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

      <TouchableOpacity
        onPress={() => navigation.navigate('AdminHistorico')}
        style={{
          backgroundColor: theme.button,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          alignSelf: 'flex-start',
          marginTop: 12,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Ver histórico completo</Text>
      </TouchableOpacity>

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
