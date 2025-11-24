import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { getHistoricoStyles } from "../styles/historicoStyles";

export default function OrdersHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => setSelectedOrder(item)}
    >
      <Text style={{ fontWeight: "bold", size: 30, color: "white" }}>
        Compra Realizada
      </Text>
      <Text style={styles.orderDate}>{item.data}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
        <Text style={styles.orderPrice}> -R$ {item.valor}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Lista de pedidos */}
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

      {/* Modal de detalhes */}
      <Modal visible={!!selectedOrder} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Compra</Text>
            {selectedOrder && (
              <>
                <Text>
                  Data: {selectedOrder.data} {selectedOrder.hora}
                </Text>
                <Text>Valor: R$ {selectedOrder.valor}</Text>
                <Text>Status: {selectedOrder.status}</Text>
                <Text style={{ marginTop: 10 }}>Itens:</Text>
                {selectedOrder.itens.map((item, idx) => (
                  <Text key={idx}>
                    - {item.nome} (R$ {item.preco.toFixed(2)})
                  </Text>
                ))}
              </>
            )}
            <TouchableOpacity
              onPress={() => setSelectedOrder(null)}
              style={styles.closeButton}
            >
              <Text style={{ color: "#fff" }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
