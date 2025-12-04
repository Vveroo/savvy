import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const getForgotPasswordStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
      paddingHorizontal: 20,
    },

    form: {
      alighItems: "center",
      width: "100%",
    },
    title: {
      fontSize: 25,
      marginBottom: 30,
      fontWeight: "bold",
      color: theme.inputText,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: theme.textMuted,
      marginBottom: 15,
      textAlign: "center",
    },
    error: {
      color: theme.error,
      fontSize: 12,
      marginBottom: 10,
      fontWeight: "500",
    },
    securityNote: {
      fontSize: 12,
      color: theme.textMuted,
      textAlign: "center",
      marginTop: 15,
      fontStyle: "italic",
    },


    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
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
      elevation: 2,
    },
    icon: {
      marginRight: 10,
      color: theme.inputText,
    },
    input: {
      flex: 1,
      height: "100%",
      color: theme.inputText,
      fontSize: 16,
      paddingVertical: 10,
    },


    button: {
      width: "100%",
      height: 50,
      backgroundColor: theme.button,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      shadowColor: theme.button,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 5,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
    },
    cancelButton: {
      width: "100%",
      height: 50,
      backgroundColor: "transparent",
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.button,
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.button,
    },


    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 30,
      width: "85%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: theme.inputText,
    },
    modalText: {
      fontSize: 14,
      color: theme.textMuted,
      textAlign: "center",
      marginBottom: 20,
    },

    codeBox: {
      backgroundColor: theme.cardBackground,
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      width: "100%",
      alignItems: "center",
    },
    codeText: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.button,
      letterSpacing: 2,
    },

    
    copyButton: {
      backgroundColor: theme.button,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
      width: "100%",
      justifyContent: "center",
      shadowColor: theme.button,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    copyButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    continueButton: {
      backgroundColor: theme.secondaryButton,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      width: "100%",
      alignItems: "center",
    },
    continueButtonText: {
      color: isDarkMode ? "#fff" : "#333",
      fontWeight: "600",
      fontSize: 16,
    },
  });
};
