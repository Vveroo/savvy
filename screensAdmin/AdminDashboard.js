
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminDashboardStyles } from '../stylesAdmin/adminDashboardStyles';
import { COLORS } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabaseClient';

export default function AdminDashboard({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = getAdminDashboardStyles(isDarkMode);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      // Tenta carregar do Supabase
      const { data, error } = await supabase
        .from('pedidos')
        .select(`
          id,
          usuario_id,
          created_at,
          total,
          status,
          usuarios(matricula)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Erro ao carregar pedidos do Supabase:', error.message);
        // Fallback para AsyncStorage
        const pJSON = await AsyncStorage.getItem('orders');
        setOrders(pJSON ? JSON.parse(pJSON) : []);
      } else {
        // Transforma dados do Supabase para formato compatível
        const formatted = (data || []).map(p => ({
          id: p.id,
          usuario: p.usuarios?.matricula || 'Desconhecido',
          total: p.total,
          status: p.status,
          data: p.created_at
        }));
        setOrders(formatted);
      }
    } catch (error) {
      console.log('Erro ao carregar pedidos:', error);
      // Fallback para AsyncStorage
      const pJSON = await AsyncStorage.getItem('orders');
      setOrders(pJSON ? JSON.parse(pJSON) : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadOrders);
    return unsubscribe;
  }, [navigation]);

  const pendingCount = orders.filter(o => o.status !== 'Concluído' && o.status !== 'Cancelado').length;
  const totalCount = orders.length;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6, marginTop: 10 }}>
          <Icon name="arrow-back-outline" size={22} color={theme.inputText} />
        </TouchableOpacity>
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
        <Text style={{ color: '#fff', fontWeight: '600' }}>Ver pedidos</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Pedidos Recentes</Text>
      <FlatList
        data={orders.slice(0, 8)}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recentItem}
            onPress={() => navigation.navigate('AdminOrderDetails')}
          >
            <Text style={styles.recentTitle}>Pedido #{item.id} - {String(item.status)}</Text>
            <Text style={styles.recentSubtitle}>{String(item.usuario || '—')} • R$ {typeof item.total === 'number' ? item.total.toFixed(2) : '0.00'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
