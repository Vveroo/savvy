import { StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  /** Barra superior com ícones */
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-start", // apenas perfil à esquerda
    alignItems: "center",
    marginBottom: 24,
    zIndex: 10,
    position: "relative",
  },

  btnPerfil: {
    padding: 10,
    borderRadius: 50,
    zIndex: 20,
  },

  icon: {
    marginLeft: 6,
  },

  greeting: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  /** Tabela de horários */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    height: 40,
  },
  deleteBtn: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addBtn: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /** Drawer lateral */
  drawerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
  },
  drawer: {
    width: "50%",
    height: "100%",
    padding: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  drawerNome: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  drawerMatricula: {
    fontSize: 14,
    marginBottom: 20,
  },
  drawerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  drawerText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export const getHomeStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return {
    ...baseStyles,
    container: {
      ...baseStyles.container,
      backgroundColor: theme.telaHome,
    },
    icon: {
      ...baseStyles.icon,
      color: theme.inputText,
    },
    greeting: {
      ...baseStyles.greeting,
      color: theme.inputText,
    },
    sectionTitle: {
      ...baseStyles.sectionTitle,
      color: theme.inputText,
    },
    tableRow: {
      ...baseStyles.tableRow,
      borderColor: theme.divider,
    },
    tableCell: {
      ...baseStyles.tableCell,
      borderColor: theme.divider,
      color: theme.inputText,
    },
    addBtn: {
      ...baseStyles.addBtn,
      backgroundColor: theme.button,
    },
    addBtnText: {
      ...baseStyles.addBtnText,
    },
    drawer: {
      ...baseStyles.drawer,
      backgroundColor: theme.telaHome,
    },
    drawerNome: {
      ...baseStyles.drawerNome,
      color: theme.inputText,
    },
    drawerMatricula: {
      ...baseStyles.drawerMatricula,
      color: theme.textMuted,
    },
    drawerText: {
      ...baseStyles.drawerText,
      color: theme.inputText,
    },
  };
};
