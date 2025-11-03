// styles/homeStyles.js

import { StyleSheet } from "react-native";
import { COLORS } from "./colors"; // ajuste o caminho conforme necessário

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.telaHome,
    padding: 20,
  },

  perfil: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  btnPerfil: {
    backgroundColor: COLORS.button,
    padding: 10,
    borderRadius: 25,
  },

  icon: {
    color: COLORS.background,
  },

  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.button,
    marginBottom: 20,
  },

  saldoBox: {
    backgroundColor: COLORS.button,
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },

  saldoLabel: {
    fontSize: 16,
    color: COLORS.background,
    marginBottom: 5,
  },

  saldoValor: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.background,
    marginBottom: 15,
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 10, 
  },

  actionButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 5,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 10,
    color: COLORS.button,
    fontWeight: "bold",
    padding: 2,
  },
});
