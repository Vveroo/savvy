import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

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

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert("Código QR Escaneado", `Dados: ${data}`);
    setCount((prev) => prev + 1);
    setTimeout(() => setScanned(false), 2000);
  };

  return (
    <View style={{ flex: 1 }}>
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
});
