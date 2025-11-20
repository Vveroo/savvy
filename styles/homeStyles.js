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
  },

  btnPerfil: {
    padding: 10,
    borderRadius: 50,
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
    elevation: 4,
    marginBottom: 28,
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
    alignItems: "center",
    marginBottom: 30,
  },

  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: "center",
  },

  buttonText: {
    fontSize: 16,
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
});

export const getHomeStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return {
    ...baseStyles,
    container: {
      ...baseStyles.container,
      backgroundColor: theme.telaHome,
    },
    btnPerfil: {
      ...baseStyles.btnPerfil,
      backgroundColor: theme.button,
    },
    icon: {
      ...baseStyles.icon,
      color: theme.inputText, // ícones seguem contraste do texto
    },
    greeting: {
      ...baseStyles.greeting,
      color: theme.inputText,
    },
    saldoBox: {
      ...baseStyles.saldoBox,
      backgroundColor: theme.card || theme.background,
      borderWidth: 1,
      borderColor: theme.divider,
    },
    saldoLabel: {
      ...baseStyles.saldoLabel,
      color: theme.textMuted,
    },
    saldoValor: {
      ...baseStyles.saldoValor,
      color: theme.preco, // verde para destacar saldo
    },
    actionButton: {
      ...baseStyles.actionButton,
      backgroundColor: theme.error, // vermelho SENAI para ação principal
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
    },
    buttonText: {
      ...baseStyles.buttonText,
      color: "#fff",
    },
    qrLabel: {
      ...baseStyles.qrLabel,
      color: theme.textMuted,
    },
  };
};
