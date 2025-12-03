import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getPaymentStyles } from '../styles/paymentStyles';
import { useTheme } from '../contexts/ThemeContext';
import { useUserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CreditCardPaymentScreen({ route, navigation }) {
  const { amount, onPaymentSuccess } = route.params || { amount: 0, onPaymentSuccess: () => { } };
  const { isDarkMode } = useTheme();
  const styles = getPaymentStyles(isDarkMode);
  const { user, setSaldo } = useUserContext();

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePay = async () => {
    if (!cardNumber || !cardName || !expiry || !cvv) {
      Alert.alert('Dados faltando', 'Preencha todos os campos do cartão.');
      return;
    }

    try {
      const result = await onPaymentSuccess(amount);

      if (result.success) {
        Alert.alert('Pagamento realizado', `R$ ${amount.toFixed(2)} creditado no seu saldo.`);
        navigation.navigate('MainTabs', { screen: 'Home' });
      } else {
        throw new Error('Falha ao atualizar saldo no sistema.');
      }

    } catch (err) {
      Alert.alert('Erro', 'Falha ao processar pagamento: ' + (err.message || err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Icon name="arrow-back-outline" size={22} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { marginLeft: 8 }]}>Cartão — Pagar R$ {amount.toFixed(2)}</Text>
      </View>

      <TextInput
        placeholder="Número do cartão"
        placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
        value={cardNumber}
        onChangeText={setCardNumber}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Nome no cartão"
        placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
        value={cardName}
        onChangeText={setCardName}
        style={styles.input}
      />
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TextInput
          placeholder="MM/AA"
          placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
          value={expiry}
          onChangeText={setExpiry}
          style={[styles.input, { flex: 1, marginRight: 8 }]} // <-- CORRIGIDO AQUI
        />
        <TextInput
          placeholder="CVV"
          placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
          value={cvv}
          onChangeText={setCvv}
          style={[styles.input, { flex: 1 }]}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePay}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
}
