import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const getChangePasswordStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    scrollContent: {
      flex: 1,
      justifyContent: "flex-start",
    },
    divider: {
      height: 1,
      backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
      marginVertical: 15,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
      marginBottom: 30,
    },
    backButton: {
      marginRight: 15,
      padding: 8,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.inputText,
    },

    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.inputText,
      marginBottom: 15,
    },

    stepIndicator: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: theme.cardBackground,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    stepNumber: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.button,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    stepNumberText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12,
    },
    stepLabel: {
      fontSize: 13,
      color: theme.inputText,
      fontWeight: "500",
    },

    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.inputText,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.button,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    input: {
      flex: 1,
      color: theme.inputText,
      fontSize: 16,
    },
    eyeIcon: {
      marginLeft: 10,
      padding: 5,
    },

    error: {
      color: theme.error,
      fontSize: 12,
      marginBottom: 10,
      fontWeight: "500",
      marginLeft: 5,
    },
    success: {
      color: "#10b981",
      fontSize: 12,
      marginBottom: 10,
      fontWeight: "500",
      marginLeft: 5,
    },
    info: {
      color: theme.textMuted,
      fontSize: 12,
      marginBottom: 15,
      marginLeft: 5,
      fontStyle: "italic",
    },

    button: {
      width: "100%",
      height: 50,
      backgroundColor: theme.button,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 8,
      shadowColor: theme.button,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 5,
    },
    buttonDisabled: {
      backgroundColor: isDarkMode ? "#4B5563" : "#d1d5db",
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
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
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
      paddingHorizontal: 20,
    },
    modalContainer: {
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 20,
      width: "85%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.inputText,
    },
    closeButton: {
      padding: 5,
    },
    modalBody: {
      marginVertical: 15,
    },
    modalText: {
      fontSize: 14,
      color: theme.inputText,
      lineHeight: 22,
      marginBottom: 12,
    },
    securityNote: {
      fontSize: 12,
      color: theme.textMuted,
      marginTop: 15,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? "#374151" : "#e5e7eb",
      fontStyle: "italic",
    },

    codeCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      alignItems: "center",
      borderLeftWidth: 4,
      borderLeftColor: theme.button,
    },
    codeLabel: {
      fontSize: 12,
      color: theme.textMuted,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    codeText: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.button,
      letterSpacing: 3,
      marginBottom: 12,
      fontFamily: "monospace",
    },
    timerText: {
      fontSize: 12,
      color: theme.inputText,
      fontWeight: "600",
    },
    expirationWarning: {
      color: theme.error,
      fontSize: 11,
      marginTop: 4,
      fontWeight: "600",
    },

    modalButtonContainer: {
      flexDirection: "column",
      width: "100%",
      marginTop: 15,
    },
    copyButton: {
      width: "100%",
      backgroundColor: theme.button,
      paddingVertical: 16,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.button,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 12,
    },
    copyButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 14,
    },
    proceedButton: {
      width: "100%",
      backgroundColor: theme.secondaryButton,
      paddingVertical: 16,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 6,
    },
    proceedButtonText: {
      color: isDarkMode ? "#fff" : "#333",
      fontWeight: "600",
      fontSize: 16,
    },
    modalSecondaryButton: {
      width: "100%",
      backgroundColor: isDarkMode ? "#6B7280" : "#9CA3AF",
      paddingVertical: 16,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    modalSecondaryButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },

    passwordRequirements: {
      backgroundColor: theme.cardBackground,
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
    },
    requirementItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    requirementCheck: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    requirementCheckMet: {
      backgroundColor: "#10b981",
    },
    requirementCheckUnmet: {
      backgroundColor: isDarkMode ? "#4B5563" : "#d1d5db",
      borderWidth: 1,
      borderColor: isDarkMode ? "#6B7280" : "#9ca3af",
    },
    requirementText: {
      fontSize: 12,
      color: theme.inputText,
    },
    requirementTextMet: {
      color: "#10b981",
    },
  });
};
