import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const getCardapioStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.telaCardapio,
      paddingHorizontal: 15,
      paddingTop: 50,
    },

    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.inputText,
      marginBottom: 14,
      textAlign: 'center',
    },

    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.divider,
      paddingHorizontal: 12,
      marginBottom: 12,
    },

    searchIcon: {
      marginRight: 8,
      color: theme.textMuted,
    },

    searchInput: {
      flex: 1,
      fontSize: 15,
      paddingVertical: 8,
      color: theme.inputText,
    },

    grid: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 80,
      width: '100%',
    },

    card: {
      backgroundColor: theme.item,
      borderRadius: 10,
      padding: 12,
      width: '100%',
      minHeight: 100,
      marginBottom: 12,
      shadowColor: theme.shadowCardapio,
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      elevation: 3,
      position: 'relative',
    },

    nome: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.inputText,
      marginBottom: 3,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },

    preco: {
      fontSize: 13,
      color: theme.preco,
      marginBottom: 8,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    
    carrinhoButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: theme.button,
      padding: 16,
      borderRadius: 50,
      elevation: 5,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalCard: {
      backgroundColor: theme.telaCardapio,
      borderRadius: 12,
      padding: 30,
      width: '85%',
      alignItems: 'center',
      elevation: 6,
      position: 'relative',
    },

    modalClose: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 20,
    },

    label: {
      alignSelf: 'flex-start',
      marginBottom: 6,
      fontSize: 14,
      fontWeight: '600',
      color: theme.inputText,
    },

    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.divider,
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
      backgroundColor: theme.inputBackground,
      color: theme.inputText,
      fontSize: 14,
    },

    pickerWrapper: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.divider,
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: theme.inputBackground,
      overflow: 'hidden',
      minHeight: 60,
      justifyContent: 'center',
    },

    picker: {
      width: '100%',
      color: theme.inputText,
      fontSize: 18,
      height: 60,
      backgroundColor: theme.inputBackground,
    },

    cartButton: {
      marginTop: 12,
      backgroundColor: theme.button,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 22,
      alignSelf: 'center',
      minWidth: '80%',
    },

    cartText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '700',
      textAlign: 'center',
    },
  });
};
