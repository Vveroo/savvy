import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const getAdminHistoricoStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  return StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 20, 
      backgroundColor: theme.background,
    },
    title: { 
      fontSize: 20, 
      fontWeight: '700', 
      color: theme.inputText, 
      marginBottom: 12 
    },
    row: { 
      padding: 12, 
      backgroundColor: theme.cardBackground, 
      borderRadius: 8, 
      marginBottom: 10 
    },
    rowTitle: { 
      color: theme.inputText, 
      fontWeight: '700' 
    },
    rowSub: { 
      color: theme.textMuted, 
      marginTop: 6 
    },
  });
};
