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
    const load = async () => {
      try {
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
          console.log('Erro Supabase:', error.message);
          const pJSON = await AsyncStorage.getItem('orders');
          setOrders(pJSON ? JSON.parse(pJSON) : []);
        } else {
          const formatted = (data || []).map(p => ({
            id: p.id,
            usuario: p.usuarios?.matricula || 'Desconhecido',
            total: typeof p.total === 'number' ? p.total : Number(p.total) || 0,
            status: p.status,
            data: p.created_at
          }));
          setOrders(formatted);
        }
      } catch (err) {
        console.log('Erro ao carregar pedidos:', err);
        const pJSON = await AsyncStorage.getItem('orders');
        setOrders(pJSON ? JSON.parse(pJSON) : []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Icon name="arrow-back-outline" size={22} color={theme.inputText} />
        </TouchableOpacity>
        <Text style={{ color: theme.inputText, marginLeft: 8, fontWeight: '600' }}>Voltar</Text>
      </View>

      <Text style={styles.title}>Histórico de Pedidos</Text>

      {loading ? (
        <ActivityIndicator size="small" color={theme.button} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(p) => String(p.id)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Pedido #{item.id} - {item.status}</Text>
              <Text style={styles.rowSub}>
                R$ {(Number(item.total) || 0).toFixed(2)}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ color: theme.textMuted, textAlign: 'center', marginTop: 20 }}>
              Nenhum pedido encontrado.
            </Text>
          }
        />
      )}
    </View>
  );
}
