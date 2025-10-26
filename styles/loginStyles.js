import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 140,
    justifyContent: 'flex-end',
  },
    boasVindas: {
      color: COLORS.textMuted,
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 20,
    },
    campoInputs: {
      marginBottom: 16,
      alignSelf: 'center',
      width: 260,
    },
    input: {
      height: 40,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: COLORS.inputBackground,
      color: COLORS.inputText,
    },
    btnMostrar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.inputBackground,
      height: 40,
      borderRadius: 5,
    },
    senhaInput: {
      flex: 1,
    },
    mostrarEsconderSenha: {
      color: COLORS.button,
      marginRight: 10,
      fontWeight: 'bold',
    },
    error: {
      color: COLORS.error,
      marginTop: 4,
      fontSize: 12,
      marginLeft: 4,
    },
    esqueciSenha: {
      color: COLORS.button,
      fontSize: 14,
      marginBottom: 4,
      marginLeft: 50,
      textDecorationLine: 'underline',
      marginTop: -10,
    },
    btnEntrar: {
      backgroundColor: COLORS.button,
      borderRadius: 5,
      marginTop: 10,
      width: 200,
      alignSelf: 'center',
      height: 40,
      justifyContent: 'center',
    },
    txtBtnEntrar: {
      color: COLORS.background,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  }
);