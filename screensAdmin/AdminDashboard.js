import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminDashboardStyles } from '../stylesAdmin/adminDashboardStyles';
import { COLORS } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabaseClient';
import { useFocusEffect } from '@react-navigation/native';

export default function AdminDashboard({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = getAdminDashboardStyles(isDarkMode);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const loadOrders = async () => {
    setLoading(true);
    try {
      // Observação: precisa existir FK pedidos.usuario_id -> usuarios.id e RLS permitir SELECT em ambas
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
        console.log('Erro Supabase (pedidos):', error.message);
        const pJSON = await AsyncStorage.getItem('orders');
        const fallback = pJSON ? JSON.parse(pJSON) : [];
        // Garante formato mínimo esperado
        const formattedFallback = fallback.map(p => ({
          id: p.id,
          usuario: p.usuario || p.matricula || 'Desconhecido',
          total: typeof p.total === 'number' ? p.total : Number(p.total) || 0,
          status: p.status || '—',
          data: p.created_at || p.data,
        }));
        setOrders(formattedFallback);
      } else {
        const formatted = (data || []).map(p => ({
          id: p.id,
          usuario: p.usuarios?.matricula || 'Desconhecido',
          total: typeof p.total === 'number' ? p.total : Number(p.total) || 0,
          status: p.status,
          data: p.created_at,
        }));
        setOrders(formatted);
      }
    } catch (err) {
      console.log('Erro ao carregar pedidos:', err);
      const pJSON = await AsyncStorage.getItem('orders');
      const fallback = pJSON ? JSON.parse(pJSON) : [];
      const formattedFallback = fallback.map(p => ({
        id: p.id,
        usuario: p.usuario || p.matricula || 'Desconhecido',
        total: typeof p.total === 'number' ? p.total : Number(p.total) || 0,
        status: p.status || '—',
        data: p.created_at || p.data,
      }));
      setOrders(formattedFallback);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  const pendingCount = orders.filter(o => o.status !== 'Concluído' && o.status !== 'Cancelado').length;
  const totalCount = orders.length;

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

      {loading ? (
        <View style={{ paddingVertical: 24 }}>
          <ActivityIndicator size="small" color={theme.button} />
        </View>
      ) : (
        <FlatList
          data={orders.slice(0, 8)}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            <Text style={{ color: theme.textMuted, marginTop: 8 }}>
              Nenhum pedido encontrado.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentItem}
              onPress={() => navigation.navigate('AdminOrderDetails', { orderId: item.id })}
            >
              <Text style={styles.recentTitle}>Pedido #{item.id} - {String(item.status || '—')}</Text>
              <Text style={styles.recentSubtitle}>
                {String(item.usuario || '—')} • R$ {(Number(item.total) || 0).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
