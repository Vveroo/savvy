import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const getLoginStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: theme.background,
      paddingHorizontal: 20,
      paddingBottom: 50,
    },

  logo: {
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 25,
    marginBottom: 40,
    fontWeight: 'bold',
    color: COLORS.text,
    alignSelf: 'center',
  },

    logo: {
      width: 270,
      height: 270,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 20,
    },

    title: {
      fontSize: 25,
      marginBottom: 40,
      fontWeight: "bold",
      color: theme.inputText,
      alignSelf: "center",
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: 50,
      backgroundColor: theme.inputBackground,
      borderRadius: 25,
      paddingHorizontal: 10,
      marginBottom: 20,
      borderWidth: 0.7,
      borderColor: theme.button,
    },

    icon: {
      marginRight: 10,
      color: theme.inputText,
    },
  mostrarEsconderSenha: {
    color: COLORS.button,
    padding: 5,
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
    },

    button: {
      width: "100%",
      height: 50,
      backgroundColor: theme.button,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },

    buttonText: {
      color: "#fff",
      fontSize: 18,
    },

    signUp: {
      color: theme.inputText,
    },

    signUpLink: {
      color: theme.button,
      textDecorationLine: "underline",
    },

    errorText: {
      color: theme.error,
      fontSize: 12,
      marginBottom: 10,
      marginLeft: 10,
      alignSelf: "flex-start",
    },

    divider: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    linha: {
      width: "40%",
      height: 1,
      backgroundColor: theme.inputText,
    },

    txtOu: {
      color: theme.inputText,
    },

    cadastro: {
      marginTop: 14,
      alignItems: "center",
    },

    contComG: {
      backgroundColor: "transparent",
      padding: 10,
      borderRadius: 25,
      width: 210,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 0.7,
      borderColor: theme.inputText,
    },

    txtBtn: {
      marginLeft: 10,
      flex: 1,
      textAlign: "center",
      color: theme.inputText,
    },

    googleIcon: {
      width: 24,
      height: 24,
    },
  });
};
