import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:  COLORS.background,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 25,
    marginBottom: 40,
    fontWeight: 'bold',
    color: COLORS.text,
    alignSelf: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 0.7,
    borderColor: COLORS.button,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: '100%',
  },

  mostrarEsconderSenha: {
    color: COLORS.button,
    padding: 5,
   },

  forgotPassword: {
    marginBottom: 20,
    color: COLORS.button,
    textDecorationLine: 'underline',
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.button,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
  },

  signUp: {
    color: '#000',
  },

  signUpLink: {
    color: COLORS.button,
    textDecorationLine: 'underline',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },

  divider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  linha: {
    width: '40%',
    height: 1,
    backgroundColor: 'black',
  },

  txtOu: {
    color: 'black',
  },

  cadastro: {
    marginTop: 14,
    alignItems: 'center',
  },

  contComG: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 25,
    width: 210,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: 'black',
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

});