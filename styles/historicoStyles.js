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
      // Adicionar marginTop para alinhar com o Título
      marginTop: 75,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 75,
      color: isDarkMode ? "#fff" : "#000",
    },
    // Corrigido de 'orderItem' para 'card'
    card: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: isDarkMode ? "#1E1E1E" : "#f9f9f9",
      borderRadius: 8,
      // Adicionar sombra para um visual de "card"
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    orderTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
      marginBottom: 5,
    },
    orderDate: {
      fontSize: 14,
      color: isDarkMode ? "#ccc" : "#555",
      // Removido o textAlign: "right" para alinhar o título com a data, mas ajustado o posicionamento no componente `HistoricoScreen.js`
      marginBottom: 5,
    },
    orderPrice: {
      fontSize: 14,
      fontWeight: "bold", // Preço em destaque
      color: isDarkMode ? "#66CC66" : "#0F4D0F", // Cor verde mais agradável
      textAlign: "right",
    },
    orderStatus: {
      fontSize: 14,
      color: isDarkMode ? "#aaa" : "#555",
      fontStyle: "italic",
    },
    emptyText: {
      textAlign: "center",
      marginTop: 50,
      fontSize: 16,
      color: isDarkMode ? "#aaa" : "#666",
    },
  });