import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addScanEvent } from '../utils/scanUtils';

export default function AdminScanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <Text>Solicitando permissão...</Text>;
  }
  if (!permission.granted) {
    return <Text>Sem permissão para usar a câmera</Text>;
  }

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert("Código QR Escaneado", `Dados: ${data}`);

    try {
      const newCount = (Number(count) || 0) + 1;
      setCount(newCount);
      await AsyncStorage.setItem('qrcode_scan_count', String(newCount));

      await addScanEvent(data);
    } catch (e) {
      console.warn('Erro ao gravar scan:', e);
    }

    setTimeout(() => setScanned(false), 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      <View style={styles.footer}>
        <Text style={styles.countText}>Scans realizados: {count}</Text>
        {scanned && (
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>Escanear novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 24,
  },
});
