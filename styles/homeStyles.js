import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  perfil: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    zIndex: 10,
    position: 'relative',
  },

  btnPerfil: {
    padding: 10,
    borderRadius: 50,
    zIndex: 20,
  },

  btnTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  btnIcon: {
    padding: 8,
    borderRadius: 25,
  },

  icon: {
    marginLeft: 6,
  },

  greeting: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  saldoBox: {
    padding: 22,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 10,
  },

  saldoLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },

  saldoValor: {
    fontSize: 32,
    fontWeight: "bold",
  },

  buttonGroup: {
    alignItems: "flex-start",
  },

  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignSelf: "flex-start",
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },

  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  qrLabel: {
    fontSize: 16,
    marginBottom: 20,
  },

  /** Drawer lateral */
  drawerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    position: "absolute",   // ✅ não cobre o botão topo
    top: 14,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    pointerEvents: 'box-none',
  },

  drawer: {
    width: "50%",
    height: "100%",
    padding: 20,
    zIndex: 1,
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
    borderColor: "#ccc"     // ✅ linha separadora// ✅ cor da linha (claro/escuro)
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
    saldoBox: {
      ...baseStyles.saldoBox,
      borderWidth: 1,
      borderColor: theme.divider,
    },
    saldoLabel: {
      ...baseStyles.saldoLabel,
      color: theme.textMuted,
    },
    saldoValor: {
      ...baseStyles.saldoValor,
      color: theme.textMuted,
    },
    actionButton: {
      ...baseStyles.actionButton,
      backgroundColor: theme.button,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    buttonText: {
      ...baseStyles.buttonText,
      color: "#fff",
    },
    qrLabel: {
      ...baseStyles.qrLabel,
      color: theme.textMuted,
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
