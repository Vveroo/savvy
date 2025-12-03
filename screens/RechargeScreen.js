import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { getPaymentStyles } from '../styles/paymentStyles';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUserContext } from '../contexts/UserContext';


export default function RechargeScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = getPaymentStyles(isDarkMode);
  const [amount, setAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { updateSaldo } = useUserContext();

  const onContinue = () => {
    const value = parseFloat(amount.replace(',', '.'));
    if (!value || value <= 0) {
      Alert.alert('Valor inválido', 'Informe um valor maior que zero.');
      return;
    }
    setModalVisible(true);
  };

  const getPaymentParams = () => ({
    amount: parseFloat(amount.replace(',', '.')),
    onPaymentSuccess: (value) => updateSaldo(value)
  });

  const goToPix = () => {
    setModalVisible(false);
    navigation.navigate('PixPayment', getPaymentParams()); // Envia { amount, onPaymentSuccess }
  };

  const goToCard = () => {
    setModalVisible(false);
    navigation.navigate('CreditCardPayment', getPaymentParams()); // Envia { amount, onPaymentSuccess }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Icon name="arrow-back-outline" size={22} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { marginLeft: 8 }]}>Recarregar Saldo</Text>
      </View>

      <TextInput
        placeholder="Valor (ex: 10.00)"
        placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <View style={styles.modal}>
            <Text style={styles.title}>Escolha a forma de pagamento</Text>
            <TouchableOpacity style={styles.optionButton} onPress={goToPix}>
              <Text style={styles.optionText}>PIX</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={goToCard}>
              <Text style={styles.optionText}>Cartão de Crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, { marginTop: 12 }]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#333' }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
