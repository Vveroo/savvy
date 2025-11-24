
import { StyleSheet } from "react-native";

export const getHistoricoStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#fff",
      padding: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    backButton: {
      marginRight: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 75,
      color: isDarkMode ? "#fff" : "#000",
    },
    orderItem: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: isDarkMode ? "#1E1E1E" : "#f9f9f9",
      borderRadius: 8,
    },
    orderTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    orderDate: {
      fontSize: 14,
      color: isDarkMode ? "#ccc" : "#555",
    },
    orderPrice: {
      fontSize: 14,
      color: isDarkMode ? "#ccc" : "#555",
    },
    orderStatus: {
      fontSize: 14,
      color: isDarkMode ? "#ccc" : "#555",
    },
    emptyText: {
      textAlign: "center",
      marginTop: 50,
      fontSize: 16,
      color: isDarkMode ? "#aaa" : "#666",
    },
  });
