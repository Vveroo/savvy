import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScreen({ route }) {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>QR Code para o ID: {userId}</Text>
      <QRCode value={`user:${userId}`} size={200} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 18, marginBottom: 20 },
});
