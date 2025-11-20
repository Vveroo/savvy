import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScreen({ route }) {
  const { orderId } = route.params;
  return (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text>Pedido Confirmado!</Text>
      <QRCode value={`pedido:${orderId}`} size={200} />
    </View>
  );
}
