import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const getAdminReportsStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  return StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: theme.background },
    title: { fontSize: 20, fontWeight: '700', color: theme.inputText, marginBottom: 12 },
    sub: { color: theme.textMuted },
  });
};
