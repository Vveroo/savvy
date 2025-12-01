import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

// 🔹 Estilos dinâmicos (dependem do tema)
export const getPaymentStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background, padding: 16 },
    header: { flexDirection: 'row', alignItems: 'center', height: 56 },
    title: { color: theme.inputText, fontSize: 20, fontWeight: '700' },
    input: {
      backgroundColor: theme.inputBackground,
      color: theme.inputText,
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
      marginTop: 12,
    },
    button: {
      backgroundColor: theme.button,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    buttonText: { color: '#fff', fontWeight: '700' },
    modal: { padding: 16, backgroundColor: theme.inputBackground, borderRadius: 10 },
    optionButton: {
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 8,
      marginTop: 8,
      backgroundColor: theme.cardBackground,
    },
    optionText: { color: theme.inputText, fontWeight: '600' },
    pixBox: { padding: 12, backgroundColor: theme.cardBackground, borderRadius: 8, marginTop: 12 },
    pixCode: { fontFamily: 'monospace', color: theme.inputText, marginTop: 8 },
    timerText: { color: theme.textMuted, marginTop: 8 },
    formRow: { marginTop: 12 },
    smallText: { color: theme.textMuted, marginTop: 8 },
  });
};

// 🔹 Estilos fixos (independentes de tema)
export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  saldoAtual: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  valor: {
    fontSize: 16,
    color: '#444',
    marginRight: 10,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
    marginTop: 10,
  },
  adicionar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },  
});
