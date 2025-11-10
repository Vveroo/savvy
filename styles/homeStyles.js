import { StyleSheet } from "react-native";
import { COLORS } from "./colors"; 

export const getHomeStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  return theme
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
    paddingTop: 40,
  },

    perfil: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },

    btnPerfil: {
      backgroundColor: getHomeStyles().button,
      padding: 10,
      borderRadius: 25,
    },

    icon: {
      color: getHomeStyles().background,
    },

    greeting: {
      fontSize: 20,
      fontWeight: "bold",
      color: getHomeStyles().button,
      marginBottom: 20,
    },

    saldoBox: {
      backgroundColor: getHomeStyles().button,
      padding: 20,
      borderRadius: 15,
      marginBottom: 30,
    },

    saldoLabel: {
      fontSize: 16,
      color: getHomeStyles().background,
      marginBottom: 5,
    },

    saldoValor: {
      fontSize: 24,
      fontWeight: "bold",
      color: getHomeStyles().background,
      marginBottom: 15,
    },

    buttonGroup: {
      flexDirection: "row",
      gap: 10,
    },

    actionButton: {
      flex: 1,
      backgroundColor: getHomeStyles().background,
      paddingVertical: 5,
      borderRadius: 25,
      alignItems: "center",
    },

    buttonText: {
      fontSize: 10,
      color: getHomeStyles().button,
      fontWeight: "bold",
      padding: 2,
    },
    
    btnPerfil: {
      backgroundColor: "#E5E7EB",
      padding: 10,
      borderRadius: 50,
    },

    icon: {
      marginLeft: 10,
    },

    greeting: {
      fontSize: 22,
      fontWeight: "600",
      color: "#111827",
      marginBottom: 20,
    },

    saldoBox: {
      backgroundColor: "#FFFFFF",
      padding: 20,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 20,
    },

    saldoHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },

    saldoLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: "#6B7280",
    },

    saldoValor: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#111827",
    },

    buttonGroup: {
      alignItems: "center",
      marginBottom: 30,
    },

    actionButton: {
      marginTop: -10,
      backgroundColor: "#007AFF",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 25,
      alignSelf: "flex-start",
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "500",
    },

    qrContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    qrLabel: {
      fontSize: 16,
      color: "#374151",
      marginBottom: 20,
    },

    categoriasContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },

  categoriaButton: {
    width: 90,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
  },

  categoriaAtiva: {
    backgroundColor: '#007AFF',
  },

  categoriaText: {
    fontSize: 14,
    color: '#333',
  },

  categoriaTextAtiva: {
    color: '#fff',
    fontWeight: '600',
  },
});




