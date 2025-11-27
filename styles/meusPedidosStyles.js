
import { StyleSheet } from "react-native";
import { COLORS } from "../styles/colors"; // ajuste o caminho conforme sua estrutura

export const getPedidosStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.inputText,
    },
    card: {
      backgroundColor: theme.item,
      padding: 15,
      marginBottom: 15,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.divider,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      color: theme.inputText,
    },
    status: {
      fontWeight: "bold",
      color: theme.button, // azul SENAI no claro, azul vibrante no escuro
      marginTop: 5,
    },
    cancelButton: {
      backgroundColor: theme.error, // vermelho SENAI
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    cancelText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
};
