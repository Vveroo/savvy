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
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.inputText,
      marginBottom: 16,
      textAlign: 'center',
    },

    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.divider,
      paddingHorizontal: 12,
      marginBottom: 16,
    },

    searchIcon: {
      marginRight: 8,
      color: theme.textMuted,
    },

    searchInput: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 10,
      color: theme.inputText,
    },

    categoriasContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 2,
      marginBottom: 12,
      marginTop: 10,
    },

    categoriaButton: {
      height: 36,
      paddingHorizontal: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 18,
      backgroundColor: theme.favButton,
      marginRight: 8,
    },

    categoriaAtiva: {
      backgroundColor: theme.favAtivo,
    },

    categoriaText: {
      fontSize: 14,
      color: theme.textMuted,
    },

    categoriaTextAtiva: {
      color: '#fff',
      fontWeight: '600',
    },

    grid: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 100,
    },

    card: {
      backgroundColor: theme.item,
      borderRadius: 12,
      padding: 16,
      width: '100%',
      minHeight: 90,
      marginBottom: 16,
      shadowColor: theme.shadowCardapio,
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
      position: 'relative',
    },

    nome: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.inputText,
      marginBottom: 4,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },

    preco: {
      fontSize: 14,
      color: theme.preco,
      marginBottom: 10,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },

    favButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: theme.favButton,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
    },

    favAtivo: {
      backgroundColor: theme.favAtivo,
    },

    favText: {
      fontSize: 16,
      color: theme.inputText,
      fontWeight: '600',
    },

    cartText: {
      fontSize: 15,
      color: theme.textMuted,
      fontWeight: '600',
    },
    cartFloatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: theme.button,
      borderRadius: 30,
      padding: 15,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },

    cartBadge: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'red',
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },

    cartBadgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
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
      padding: 20,
      width: '85%',
      alignItems: 'center',
      elevation: 6,
    },

    modalClose: {
      position: 'absolute',
      top: 10,
      right: 10,
    },

    modalNome: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.inputText,
      marginBottom: 6,
      textAlign: 'center',
    },

    modalPreco: {
      fontSize: 16,
      color: theme.preco,
      marginBottom: 10,
    },

    modalDescricao: {
      fontSize: 14,
      color: theme.textMuted,
      textAlign: 'center',
      marginBottom: 16,
    },

    quantidadeWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },

    quantidadeBtn: {
      backgroundColor: theme.inputBackground,
      padding: 8,
      borderRadius: 6,
      marginHorizontal: 10,
    },

    quantidadeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.inputText,
    },

    quantidadeValor: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.inputText,
    },

    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
  });
};
