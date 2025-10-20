import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    paddingBottom: 140,
    justifyContent: 'flex-end',
  },
  background:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    divider: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      alignItems: 'center',
    },
    linha: {
      width: '40%',
      height: 1,
      backgroundColor: COLORS.divider,
    },
    txtOu: {
      color: COLORS.divider,
    },
    cadastro: {
      marginTop: 14,
      alignItems: 'center',
    },
    contComG: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 25,
      width: 210,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    txtBtn: {
      marginLeft: 10,
      flex: 1,
      textAlign: 'center',
    },
    googleIcon: {
      width: 24,
      height: 24,
    },
    semConta: {
      flexDirection: 'row',
      marginTop: 10,
      gap: 7,
    },
    txtSemConta: {
      color: COLORS.textMuted,
    },
    btnSemConta: {
      color: COLORS.button,
      textDecorationLine: 'underline',
    },
  });