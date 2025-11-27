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
      textAlign: "right",
    },
    orderPrice: {
      fontSize: 14,
      color: isDarkMode ? "#008000" : "#0F4D0F",
      textAlign: "right",
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
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      width: "80%",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: isDarkMode ? "#003366" : "#3B82F6",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
  });
