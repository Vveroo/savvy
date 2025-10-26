import { COLORS } from "./colors";
export const styles = ({
  container: {
    flex: 1,
    backgroundColor: COLORS.telaHome,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
      color: COLORS.textMuted,
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 20,
  },
  botao: {
    backgroundColor: COLORS.button,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  txtBotao: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: '600',
  },
});
