import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const getCommonStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  return StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: theme.background, 
      padding: 16 
    },
    headerRow: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginBottom: 12 
    },
    title: { 
      color: theme.inputText, 
      fontSize: 20, 
      fontWeight: '700' 
    },
    card: { 
      backgroundColor: theme.cardBackground, 
      padding: 12, 
      borderRadius: 8, 
      marginBottom: 12 
    },
    tableHeader: { 
      flexDirection: 'row', 
      paddingVertical: 8, 
      borderBottomWidth: 1, 
      borderColor: theme.divider 
    },
    tableRow: { 
      flexDirection: 'row', 
      paddingVertical: 10, 
      borderBottomWidth: 1, 
      borderColor: theme.divider 
    },
    colTurma: { 
      flex: 1 
    },
    colHorario: { 
      flex: 1 
    },
    cellText: { 
      color: theme.inputText 
    },
    smallMuted: { 
      color: theme.textMuted, 
      fontSize: 12 
    },
    btn: { 
      backgroundColor: theme.button, 
      paddingVertical: 10, 
      paddingHorizontal: 12, 
      borderRadius: 8, 
      alignItems: 'center' 
    },
    btnText: { 
      color: '#fff', 
      fontWeight: '700' 
    },
    editButton: { 
      paddingHorizontal: 8, 
      paddingVertical: 6, 
      borderRadius: 6, 
      backgroundColor: theme.favAtivo 
    },
    input: { 
      backgroundColor: theme.inputBackground, 
      color: theme.inputText, 
      padding: 10, 
      borderRadius: 8 
    },
    modalCard: { 
      backgroundColor: theme.cardBackground, 
      padding: 16, 
      borderRadius: 10 
    },
  });
};
