import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginBottom: 24,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    error: {
      color: 'red',
      marginBottom: 8,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    voltar: {
      alignItems: 'center',
      marginTop: 10,
    },
    voltarLogin: {
      textDecorationLine: "underline",
    },
  });