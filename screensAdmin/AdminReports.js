import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminReportsStyles } from '../styles/adminReportsStyles';

export default function AdminReports() {
  const { isDarkMode } = useTheme();
  const styles = getAdminReportsStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      <Text style={styles.sub}>Por enquanto essa tela é um placeholder com estatísticas básicas no futuro.</Text>
    </View>
  );
}
