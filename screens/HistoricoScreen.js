
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { getHistoricoStyles } from "../styles/historicoStyles";

export default function OrdersHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const styles = getHistoricoStyles(isDarkMode);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await AsyncStorage.getItem("orders");
        if (data) {
          setOrders(JSON.parse(data));
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    };
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>{item.nome}</Text>
      <Text style={styles.orderDate}>Data: {item.data}</Text>
      <Text style={styles.orderPrice}>Valor: R$ {item.valor}</Text>
      <Text style={styles.orderStatus}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text style={styles.title}>Histórico de Compras</Text>
      </View>

      {/* Lista de pedidos */}
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma compra encontrada.</Text>
      )}
    </View>
  );
}
