import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { getPaymentStyles } from '../styles/paymentStyles';
import { useTheme } from '../contexts/ThemeContext';
import { useUserContext } from '../contexts/UserContext';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

function generatePixKey() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export default function PixPaymentScreen({ route, navigation }) {
  const { amount } = route.params || { amount: 0 };
  const { isDarkMode } = useTheme();
  const styles = getPaymentStyles(isDarkMode);
  const { user, saldo, setSaldo } = useUserContext();

  const [pixKey] = useState(generatePixKey());
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(timer);
          setExpired(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyPix = async () => {
    await Clipboard.setStringAsync(pixKey);
    Alert.alert('PIX copiado', 'Código PIX copiado para a área de transferência.');
  };

  const confirmPayment = async () => {
    if (expired) {
      Alert.alert('Tempo expirado', 'O código PIX expirou. Gere um novo pagamento.');
      return;
    }

    try {
      // Atualiza saldo do usuário em AsyncStorage
      const usersJSON = await AsyncStorage.getItem('usuarios');
      const users = usersJSON ? JSON.parse(usersJSON) : [];
      const idx = users.findIndex(u => u.matricula === user.matricula);
      if (idx !== -1) {
        users[idx].saldo = (users[idx].saldo || 0) + amount;
        await AsyncStorage.setItem('usuarios', JSON.stringify(users));
      }
      setSaldo(prev => prev + amount);
      Alert.alert('Pagamento confirmado', `R$ ${amount.toFixed(2)} creditado no seu saldo.`);
      navigation.navigate('MainTabs', { screen: 'Home' });
    } catch (err) {
      Alert.alert('Erro', 'Falha ao atualizar saldo: ' + (err.message || err));
    }
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Icon name="arrow-back-outline" size={22} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { marginLeft: 8 }]}>PIX — Pagar R$ {amount.toFixed(2)}</Text>
      </View>

      <View style={styles.pixBox}>
        <Text style={styles.smallText}>Chave PIX (simulada)</Text>
        <Text style={styles.pixCode}>{pixKey}</Text>
        <TouchableOpacity onPress={copyPix} style={[styles.button, { marginTop: 10 }]}>
          <Text style={styles.buttonText}>Copiar PIX</Text>
        </TouchableOpacity>

        <Text style={styles.timerText}>Tempo restante: {minutes}:{seconds.toString().padStart(2, '0')}</Text>

        <TouchableOpacity onPress={confirmPayment} style={[styles.button, { marginTop: 16 }]}>
          <Text style={styles.buttonText}>Confirmar pagamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
