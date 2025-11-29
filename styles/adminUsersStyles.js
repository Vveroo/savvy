import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const getAdminUsersStyles = (isDarkMode) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  return StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: theme.background },
    title: { fontSize: 20, fontWeight: '700', color: theme.inputText, marginBottom: 12 },
    userRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: theme.cardBackground, borderRadius: 8, marginBottom: 10 },
    userName: { color: theme.inputText, fontWeight: '700' },
    userRole: { color: theme.textMuted, fontSize: 12 },
    userActions: { alignItems: 'flex-end', justifyContent: 'center' },
    userSaldo: { color: theme.inputText, fontWeight: '700', marginBottom: 8 },
    smallButton: { backgroundColor: '#10b981', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 6 },
    smallButtonText: { color: '#fff', fontWeight: '700' },
  });
};
