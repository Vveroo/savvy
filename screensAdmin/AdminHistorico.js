
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminHistoricoStyles } from '../stylesAdmin/adminHistoricoStyles';
import { COLORS } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminHistorico({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = getAdminHistoricoStyles(isDarkMode);
  const [orders, setOrders] = useState([]);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const load = async () => {
      const pJSON = await AsyncStorage.getItem('orders'); // ✅ corrigido
      setOrders(pJSON ? JSON.parse(pJSON) : []);
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
      <FlatList
        data={orders.slice().reverse()} // ✅ mostra todos os pedidos
        keyExtractor={(p) => p.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Pedido #{item.id} - {item.status}</Text>
            <Text style={styles.rowSub}>R$ {item.total?.toFixed(2) || '0.00'}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: theme.textMuted, textAlign: 'center', marginTop: 20 }}>Nenhum pedido encontrado.</Text>}
      />
    </View>
  );
}
