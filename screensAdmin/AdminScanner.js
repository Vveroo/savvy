import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AdminScanner({ navigation }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [count, setCount] = useState(0);

  // Solicitar permissão e carregar contador inicial
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      const cntStr = await AsyncStorage.getItem('qrcode_scan_count');
      const cnt = cntStr ? parseInt(cntStr, 10) : 0;
      setCount(cnt);
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);

    const matricula = String(data).trim();
    const today = new Date().toISOString().slice(0, 10);

    try {
      const readsJSON = await AsyncStorage.getItem('qrcode_reads');
      const reads = readsJSON ? JSON.parse(readsJSON) : {};

      // Se já foi lido hoje, alerta e não incrementa contador
      if (reads[matricula] === today) {
        Alert.alert('Já lido hoje', 'Este QR code já foi validado hoje.');
        return;
      }

      // Registrar leitura
      reads[matricula] = today;
      await AsyncStorage.setItem('qrcode_reads', JSON.stringify(reads));

      // Atualizar contador
      const newCnt = count + 1;
      setCount(newCnt);
      await AsyncStorage.setItem('qrcode_scan_count', String(newCnt));

      // Registrar log
      const logsJSON = await AsyncStorage.getItem('qrcode_scan_logs');
      const logs = logsJSON ? JSON.parse(logsJSON) : [];
      const entry = { matricula, when: new Date().toISOString() };
      logs.unshift(entry);
      await AsyncStorage.setItem('qrcode_scan_logs', JSON.stringify(logs));

      Alert.alert('Sucesso', `QR code de ${matricula} validado.`);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao processar QR: ' + (err.message || err));
    }
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.inputText }}>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.inputText }}>Permissão de câmera negada. Ative nas configurações.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          <Text style={{ color: theme.button }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header com botão voltar */}
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Icon name="arrow-back-outline" size={22} color={theme.inputText} />
        </TouchableOpacity>
        <Text style={{ color: theme.inputText, marginLeft: 8, fontWeight: '600' }}>Scanner Alunos</Text>
      </View>

      {/* Contador */}
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.inputText }}>
          Total de QR codes validados: {count}
        </Text>
      </View>

      {/* Scanner */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />

      {/* Botão para escanear novamente */}
      {scanned && (
        <View style={{ alignItems: 'center', padding: 12 }}>
          <TouchableOpacity
            onPress={() => setScanned(false)}
            style={{ backgroundColor: theme.button, padding: 10, borderRadius: 6 }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Escanear novamente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
