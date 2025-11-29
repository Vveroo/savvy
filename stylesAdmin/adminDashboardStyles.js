import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const getAdminDashboardStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.inputText,
      marginBottom: 16,
    },
    cardsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 18,
    },
    card: {
      flex: 1,
      backgroundColor: theme.cardBackground,
      padding: 14,
      borderRadius: 10,
      marginRight: 10,
    },
    cardTitle: {
      color: theme.textMuted,
      fontSize: 12,
      marginBottom: 8,
    },
    cardValue: {
      color: theme.inputText,
      fontSize: 20,
      fontWeight: '700',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.inputText,
      marginBottom: 10,
    },
    recentItem: {
      backgroundColor: theme.inputBackground,
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
    },
    recentTitle: {
      color: theme.inputText,
      fontWeight: '600',
    },
    recentSubtitle: {
      color: theme.textMuted,
      marginTop: 4,
      fontSize: 12,
    },
  });
};
