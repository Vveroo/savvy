import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getAdminUsersStyles } from '../styles/adminUsersStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminUsers({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = getAdminUsersStyles(isDarkMode);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const load = async () => {
      const uJSON = await AsyncStorage.getItem('usuarios');
      setUsuarios(uJSON ? JSON.parse(uJSON) : []);
    };
    load();
  }, []);

  const adjustSaldo = async (matricula, delta) => {
    try {
      const uJSON = await AsyncStorage.getItem('usuarios');
      const users = uJSON ? JSON.parse(uJSON) : [];
      const idx = users.findIndex(u => u.matricula === matricula);
      if (idx !== -1) {
        users[idx].saldo = (users[idx].saldo || 0) + delta;
        await AsyncStorage.setItem('usuarios', JSON.stringify(users));
        setUsuarios(users);
        Alert.alert('Sucesso', 'Saldo atualizado.');
      }
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(u) => u.matricula}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <View>
              <Text style={styles.userName}>{item.matricula}</Text>
              <Text style={styles.userRole}>{item.role || 'student'}</Text>
            </View>
            <View style={styles.userActions}>
              <Text style={styles.userSaldo}>R$ {(item.saldo||0).toFixed(2)}</Text>
              <TouchableOpacity style={styles.smallButton} onPress={() => adjustSaldo(item.matricula, 10)}>
                <Text style={styles.smallButtonText}>+R$10</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
