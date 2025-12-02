import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../styles/colors';

export default function AdminScanner() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const cntStr = await AsyncStorage.getItem('qrcode_scan_count');
      const cnt = cntStr ? parseInt(cntStr, 10) : 0;
      setCount(cnt);
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;

    setScanned(true);
    Alert.alert('Código QR Escaneado', `Dados: ${data}`);

    const newCount = count + 1;
    setCount(newCount);
    await AsyncStorage.setItem('qrcode_scan_count', newCount.toString());
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Permissão para acessar a câmera foi negada.</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <Text style={[styles.text, { color: theme.text }]}>Escaneie um código QR</Text>
        </View>
      </Camera>
      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Escanear Novamente</Text>
        </TouchableOpacity>
      )}
      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text style={{ color: theme.text, fontSize: 16 }}>
          Contagem de Scans: **{count}**
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold', padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5 },
  button: { backgroundColor: '#2196F3', padding: 15, alignItems: 'center', margin: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});