import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../contexts/UserContext";
import Icon from "react-native-vector-icons/Ionicons";
import { getHistoricoStyles } from "../styles/historicoStyles";
import { useTheme } from "../contexts/ThemeContext";

export default function HistoricoScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { user } = useUserContext();

  const { isDarkMode } = useTheme();
  const styles = getHistoricoStyles(isDarkMode);

  useEffect(() => {
    const fetchOrders = async () => {

      if (!user || !user.id) {
        setOrders([]);
        return;
      }

      try {
        const key = `orders_${user.id}`;
        const data = await AsyncStorage.getItem(key);

        if (data) {
          setOrders(JSON.parse(data));
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user?.id]);

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.orderTitle}>Compra Realizada</Text>
      <Text style={styles.orderDate}>{item.data}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
        <Text style={styles.orderPrice}>R$ {typeof item.total === 'number' ? item.total.toFixed(2) : '0.00'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon
            name="arrow-back"
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Histórico de Compras</Text>
      </View>


      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma compra encontrada.</Text>
      )}
    </View>
  );
}
