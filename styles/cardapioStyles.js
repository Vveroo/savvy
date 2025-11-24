import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors'; // ajuste o caminho conforme sua estrutura

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
      fontSize: 16,
      paddingVertical: 10,
      color: theme.inputText,
    },

    categoriasContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 2,
      marginBottom: 1,
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
      minHeight: 140,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: theme.shadowCardapio,
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
    },

    nome: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.inputText,
      textAlign: 'center',
      marginBottom: 4,
    },

    preco: {
      fontSize: 14,
      color: theme.preco,
      marginBottom: 10,
    },

    cardButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 8,
    },

    favButton: {
      backgroundColor: theme.favButton,
      paddingVertical: 6,
      paddingHorizontal: 14,
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

    cartButton: {
      backgroundColor: theme.preco,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
    },

    cartText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
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

    /** estilos para o modal */
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

    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 10,
    },
  });
};
