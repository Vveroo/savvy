import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const getLoginStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",   // Centraliza verticalmente
      alignItems: "center",       // Centraliza horizontalmente
      backgroundColor: theme.background,
      paddingHorizontal: 20,
    },

    logo: {
      width: 200,
      height: 200,
      resizeMode: "contain",
      marginBottom: 20,
    },

    title: {
      fontSize: 25,
      marginBottom: 40,
      fontWeight: "bold",
      color: theme.inputText,
      textAlign: "center",
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%", // largura fixa para centralizar
      height: 50,
      backgroundColor: theme.inputBackground,
      borderRadius: 25,
      paddingHorizontal: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.button,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2, // sombra no Android
    },

    icon: {
      marginRight: 10,
      color: theme.inputText,
    },

    input: {
      flex: 1,
      height: "100%",
      color: theme.inputText,
    },

    mostrarEsconderSenha: {
      color: theme.button,
      padding: 5,
    },

    forgotPassword: {
      marginBottom: 20,
      color: theme.button,
      textDecorationLine: "underline",
      textAlign: "center",
    },

    button: {
      width: "80%", // igual aos inputs
      height: 50,
      backgroundColor: theme.button,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 3,
    },

    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    
    errorBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.error,
      paddingVertical: 20,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
    },
    
    errorText: {
      top: 10,
      color: "#fff",
      fontSize: 15,
      fontWeight: "600",
      textAlign: "center",
    },
  });
};
