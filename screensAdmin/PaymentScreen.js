import React from 'react';
import { View, Text, Button } from 'react-native';

export default function PaymentScreen({ route, navigation }) {
  const { total } = route.params;
  const orderId = Date.now().toString();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Pagamento</Text>
      <Text>Total a pagar: R$ {total}</Text>
      <Button title="Simular Pagamento PIX" onPress={() => navigation.navigate('QRCode', { orderId })} />
    </View>
  );
}
