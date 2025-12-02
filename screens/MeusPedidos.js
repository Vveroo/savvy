import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPedidosStyles } from "../styles/meusPedidosStyles";
import { useTheme } from "../contexts/ThemeContext";

export default function MeusPedidos() {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkMode } = useTheme();
  const styles = getPedidosStyles(isDarkMode);

  const loadOrders = async () => {
    const data = await AsyncStorage.getItem("orders");
    setOrders(data ? JSON.parse(data) : []);
  };

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
      order.id === id ? { ...order, status: "Cancelado" } : order
    );
    setOrders(updatedOrders);
    await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
    Alert.alert("Pedido cancelado com sucesso.");
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido #{item.id}</Text>
      
      <Text style={styles.elise}>Data: {item.data} - Hora: {item.hora}</Text>
      
      <Text style={styles.status}>
          Status: {item.status}
      </Text>

      <FlatList
        data={item.items || []}
        keyExtractor={(it, i) => (it.id ? it.id.toString() : i.toString())}
        renderItem={({ item: product }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{product.nome}</Text>
            <Text style={styles.itemQty}>x{product.quantidade || 1}</Text>
            <Text style={styles.itemPrice}>R$ {(product.preco || 0).toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {item.total?.toFixed(2) || "0.00"}</Text>

      {item.status !== "Concluído" && item.status !== "Cancelado" && (
        <TouchableOpacity style={styles.cancelButton} onPress={() => cancelOrder(item.id)}>
          <Text style={styles.cancelText}>Cancelar Compra</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: isDarkMode ? "#ccc" : "#555" }}>
            Nenhum pedido encontrado.
          </Text>
        }
      />
    </View>
  );
}