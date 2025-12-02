import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminDashboardStyles } from '../stylesAdmin/adminDashboardStyles';
import { COLORS } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabaseClient';
import { useFocusEffect } from '@react-navigation/native';
import { getScanEvents, aggregateByWeekAndShift } from '../utils/scanUtils';

export default function AdminDashboard({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = getAdminDashboardStyles(isDarkMode);
  const [orders, setOrders] = useState([]);
  const [scanStats, setScanStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .select(`id, usuario_id, created_at, total, status, usuarios(matricula)`)
        .order('created_at', { ascending: false });

      let formatted = [];
      if (!error && Array.isArray(data)) {
        formatted = data.map((p) => ({
          id: p.id,
          usuario: p.usuarios?.matricula || 'Desconhecido',
          total: typeof p.total === 'number' ? p.total : Number(p.total) || 0,
          status: p.status,
          data: p.created_at || null,
        }));
      } else if (error) {
        console.warn('Erro Supabase (pedidos):', error.message);
      }

      
      let localMapped = [];
      try {
        const localJSON = await AsyncStorage.getItem('orders');
        const local = localJSON ? JSON.parse(localJSON) : [];
        localMapped = (local || []).map((o) => ({
          id: o.id,
          usuario: o.usuario || o.usuario_id || 'Desconhecido',
          total: o.total || 0,
          status: o.status || 'pending',
          data: o.created_at || o.data || null,
          _local: true,
        }));
      } catch (e) {
        console.warn('Erro ao ler pedidos locais:', e);
      }

      
      const supabaseIds = new Set(formatted.map((f) => String(f.id)));
      const merged = [
        ...formatted,
        ...localMapped.filter((l) => !supabaseIds.has(String(l.id))),
      ];

      
      merged.sort((a, b) => {
        const ta = a.data ? new Date(a.data).getTime() : 0;
        const tb = b.data ? new Date(b.data).getTime() : 0;
        return tb - ta;
      });

      setOrders(merged);
      
      try {
        const events = await getScanEvents();
        const agg = aggregateByWeekAndShift(events);
        setScanStats(agg);
      } catch (e) {
        console.warn('Erro ao carregar estatísticas de scans:', e);
        setScanStats([]);
      }
    } catch (err) {
      console.warn('Erro ao carregar pedidos no dashboard:', err);
      const pJSON = await AsyncStorage.getItem('orders');
      setOrders(pJSON ? JSON.parse(pJSON) : []);
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

      
      <View style={{ marginTop: 16 }}>
        <Text style={styles.sectionTitle}>Scans (Semana Seg-Qui por Turno)</Text>
        {scanStats && scanStats.length > 0 ? (
          <View style={{ marginTop: 8 }}>
            
            <View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 6, backgroundColor: '#f2f2f2', borderRadius: 6 }}>
              <Text style={{ flex: 2, fontWeight: '700' }}>Semana</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: '700' }}>Mat</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: '700' }}>Ves</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: '700' }}>Not</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: '700' }}>Total</Text>
            </View>

            {/* Table rows */}
            <FlatList
              data={scanStats}
              keyExtractor={(item) => item.week}
              style={{ marginTop: 8 }}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 6, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                  <Text style={{ flex: 2 }}>{item.week}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{item.Matutino}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{item.Vespertino}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{item.Noturno}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{item.total}</Text>
                </View>
              )}
            />
          </View>
        ) : (
          <Text style={{ color: theme.textMuted, marginTop: 8 }}>Sem registros de scan.</Text>
        )}
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
