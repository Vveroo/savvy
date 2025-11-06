import { StyleSheet } from "react-native";
import { COLORS } from "./colors"; 

export const getHomeStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.telaHome,
      padding: 20,
    },

    perfil: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },

    btnPerfil: {
      backgroundColor: theme.button,
      padding: 10,
      borderRadius: 25,
    },

    icon: {
      color: theme.background,
    },

    greeting: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.button,
      marginBottom: 20,
    },

    saldoBox: {
      backgroundColor: theme.button,
      padding: 20,
      borderRadius: 15,
      marginBottom: 30,
    },

    saldoLabel: {
      fontSize: 16,
      color: theme.background,
      marginBottom: 5,
    },

    saldoValor: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.background,
      marginBottom: 15,
    },

    buttonGroup: {
      flexDirection: "row",
      gap: 10,
    },

    actionButton: {
      flex: 1,
      backgroundColor: theme.background,
      paddingVertical: 5,
      borderRadius: 25,
      alignItems: "center",
    },

    buttonText: {
      fontSize: 10,
      color: theme.button,
      fontWeight: "bold",
      padding: 2,
    },
  });
};
