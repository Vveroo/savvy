import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors'; 


export const getCartStyles = (isDarkMode) => {
    const theme = isDarkMode ? COLORS.dark : COLORS.light;
  
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.telaCart,
        paddingHorizontal: 15,
        paddingTop: 50,
      },
      
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
  
      backButton: {
        padding: 8,
        marginRight: 10,
      },
  
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.inputText, 
      },
  
      item: {
        fontSize: 16,
        color: theme.inputText,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.divider,
      },
  
      total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.preco,
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
      },
  
      button: {
        backgroundColor: theme.button,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
      },
  
      buttonSecondary: {
        backgroundColor: 'transparent',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.textMuted,
        marginBottom: 80,
      },
  
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      },

      buttonTextSecondary: { 
          color: theme.textMuted
      }
    });
  };