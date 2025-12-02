import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const getAdminOrderDetailsStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  
  return StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 20, 
      backgroundColor: theme.background 
    },
    header: { 
      fontSize: 24, 
      fontWeight: '800', 
      color: theme.inputText, 
      textAlign: 'center', 
      marginBottom: 20,
      paddingTop: 10,
    },
    card: {
      backgroundColor: theme.item,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: theme.divider,
      shadowColor: isDarkMode ? '#000' : '#888',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
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
    emptyText: { 
      textAlign: 'center', 
      marginTop: 50, 
      color: theme.textMuted 
    },
    itemRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingVertical: 8, 
      borderBottomWidth: 1, 
      borderColor: theme.divider 
    },
    itemName: { 
      flex: 3,
      color: theme.inputText, 
      fontWeight: '600' 
    },
    itemQty: { 
      flex: 1,
      textAlign: 'center',
      color: theme.textMuted 
    },
    itemPrice: { 
      flex: 1.5,
      textAlign: 'right',
      color: theme.inputText 
    },
    total: { 
      marginTop: 12, 
      fontSize: 18, 
      fontWeight: '700', 
      color: theme.inputText,
      textAlign: 'right', 
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.divider,
    },
    actionsRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginTop: 18,
      alignItems: 'center', 
    },
    actionButton: { 
      backgroundColor: theme.button, 
      paddingVertical: 12, 
      borderRadius: 8, 
      alignItems: 'center',
      flexGrow: 1,
    },
    actionText: { 
      color: '#fff', 
      fontWeight: '700' 
    },
    trashButton: {
        backgroundColor: '#F44336',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        marginLeft: 10,
        flexGrow: 0,
    }
  });
};