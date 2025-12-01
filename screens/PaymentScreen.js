
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from "../styles/paymentStyles";

export default function RecargaScreen() {
  const [valor, setValor] = useState('');

  const confirmarRecarga = () => {
    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

    Alert.alert(
      'Confirmação',
      `Deseja confirmar a recarga de R$ ${valor}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => Alert.alert('Sucesso', 'Recarga realizada!') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recarga</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />
      <Button title="Confirmar Recarga" onPress={confirmarRecarga} />
    </View>
  );
}
