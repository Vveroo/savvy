import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPedidosStyles } from "../styles/meusPedidosStyles";
import { useTheme } from "../contexts/ThemeContext"; 

export default function MeusPedidos() {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    const data = await AsyncStorage.getItem("orders");
    setOrders(data ? JSON.parse(data) : []);
  };

  const { isDarkMode } = useTheme(); 
  const styles = getPedidosStyles(isDarkMode); 

  useEffect(() => {
    loadOrders();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const cancelOrder = async (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: "cancelado e reembolsado" } : order
    );
    setOrders(updatedOrders);
    await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.status !== "concluido" && order.status !== "cancelado e reembolsado"
  );

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido #{item.id}</Text>
      <Text style={styles.elise}>
        Data: {item.data} - Hora: {item.hora}
      </Text>
      <Text style={styles.elise}>Itens: {item.quantidade}</Text>
      <Text style={styles.elise}>Valor: R$ {item.valor}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>

      {item.status !== "concluido" &&
        item.status !== "cancelado e reembolsado" && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => cancelOrder(item.id)}
          >
            <Text style={styles.cancelText}>Cancelar Compra</Text>
          </TouchableOpacity>
        )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Pedidos</Text>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: isDarkMode ? "#ccc" : "#555" }}>
            Nenhum pedido encontrado.
          </Text>
        }
      />
    </View>
  );
}
