import { StyleSheet } from "react-native";
import { COLORS } from "../styles/colors"; 

export const getPedidosStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
      paddingTop: 50,
    },
    header: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 25,
      color: theme.inputText,
      textAlign: "center",
      letterSpacing: 1,
    },
    card: {
      backgroundColor: theme.item,
      padding: 18,
      marginBottom: 18,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.divider,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 8,
      color: theme.inputText,
    },
    description: {
      color: isDarkMode ? "#bbb" : "#666",
      marginTop: 4,
      fontSize: 15,
      lineHeight: 20,
    },
    valor: {
      color: "#2ecc71", 
      fontWeight: "700",
      textAlign: "right",
      marginTop: 6,
      fontSize: 16,
    },
    status: {
      fontWeight: "600",
      color: theme.button,
      marginTop: 8,
      fontSize: 15,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      alignSelf: "flex-start",
      backgroundColor: isDarkMode ? "rgba(0,123,255,0.2)" : "rgba(0,123,255,0.1)",
    },
    cancelButton: {
      backgroundColor: theme.error,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 12,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    cancelText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 15,
      textAlign: "center",
      letterSpacing: 0.5,
    },
    elise: {
      color: isDarkMode ? "#bbb" : "#666",
    },
  });
};
