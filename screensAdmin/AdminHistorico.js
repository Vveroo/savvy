import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminHistoricoStyles } from '../stylesAdmin/adminHistoricoStyles';
import { COLORS } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabaseClient';

export default function AdminHistorico({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = getAdminHistoricoStyles(isDarkMode);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .select(`id, usuario_id, created_at, total, status, usuarios(matricula)`)
          .order('created_at', { ascending: false });

        let formatted = [];

        if (error) {
          console.warn('Erro Supabase ao buscar pedidos:', error.message);
        } else if (data && Array.isArray(data)) {
          formatted = data.map((p) => ({
            id: p.id,
            usuario: p.usuarios?.matricula || 'Desconhecido',
            total: typeof p.total === 'number' ? p.total : Number(p.total) || 0,
            status: p.status,
            data: p.created_at || null
          }));
        }

        // Read local orders and map to same shape
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
            _local: true
          }));
        } catch (e) {
          console.warn('Erro ao ler pedidos locais:', e);
        }

        // Merge - keep supabase entries first, then local ones not present in supabase
        const supabaseIds = new Set(formatted.map((f) => String(f.id)));
        const merged = [
          ...formatted,
          ...localMapped.filter((l) => !supabaseIds.has(String(l.id)))
        ];

        // Sort by date desc
        merged.sort((a, b) => {
          const ta = a.data ? new Date(a.data).getTime() : 0;
          const tb = b.data ? new Date(b.data).getTime() : 0;
          return tb - ta;
        });

        setOrders(merged);
      } catch (err) {
        console.warn('Erro ao carregar histórico:', err);
        const pJSON = await AsyncStorage.getItem('orders');
        setOrders(pJSON ? JSON.parse(pJSON) : []);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={22} color={theme.inputText} />
          <Text style={{ color: theme.inputText, marginLeft: 8, fontWeight: '600' }}>{String('Voltar')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{String('Histórico de Pedidos')}</Text>

      {loading ? (
        <ActivityIndicator size="small" color={theme.button} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(p) => String(p.id)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.rowTitle}>{`Pedido #${String(item.id)} - ${String(item.status)}`}</Text>
              <Text style={styles.rowSub}>{`R$ ${(Number(item.total) || 0).toFixed(2)}`}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ color: theme.textMuted, textAlign: 'center', marginTop: 20 }}>{String('Nenhum pedido encontrado.')}</Text>
          }
        />
      )}
    </View>
  );
}
