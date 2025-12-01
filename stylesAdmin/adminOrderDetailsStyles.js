import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const getAdminOrderDetailsStyles = (isDarkMode) => {
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
      marginBottom: 6 
    },
    subtitle: { 
      color: theme.textMuted, 
      marginBottom: 12 
    },
    itemRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingVertical: 8, 
      borderBottomWidth: 1, 
      borderColor: theme.divider 
    },
    itemName: { 
      color: theme.inputText, 
      fontWeight: '600' 
    },
    itemQty: { 
      color: theme.textMuted 
    },
    itemPrice: { 
      color: theme.inputText 
    },
    total: { 
      marginTop: 12, 
      fontSize: 16, 
      fontWeight: '700', 
      color: theme.inputText 
    },
    actionsRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginTop: 18 
    },
    actionButton: { 
      flex: 1, 
      marginHorizontal: 6, 
      backgroundColor: theme.button, 
      paddingVertical: 12, 
      borderRadius: 8, 
      alignItems: 'center' 
    },
    actionText: { 
      color: '#fff', 
      fontWeight: '700' 
    },
  });
};
