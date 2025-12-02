import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// Certifique-se de que esta importação está correta para sua versão do Expo
import Camera from 'expo-camera'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Ícone para o botão Voltar

// ⚠️ Se o seu navigation não tem a prop 'goBack', mude para 'navigation.navigate('Home')'
export default function AdminScanner({ navigation }) {
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

  // --- COMPONENTES DE ESTADO ---

  // 1. Solicitando Permissão ou Permissão Negada (Centralizado)
  if (hasPermission === null || hasPermission === false) {
    const statusText = hasPermission === null 
      ? 'Aguardando solicitação da Câmera...' 
      : 'Permissão para acessar a Câmera foi negada.';

    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.statusText, { color: theme.text }]}>
          {statusText}
        </Text>
        <TouchableOpacity 
            style={[styles.button, { marginTop: 20 }]} 
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 2. Câmera Ativa
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Botão de Voltar para a Home */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.item }]}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color={theme.inputText} />
      </TouchableOpacity>

      {/* Câmera e Scanner */}
      <Camera
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <Text style={[styles.text, { color: theme.text }]}>Escaneie um código QR</Text>
        </View>
      </Camera>

      {/* Área Inferior (Contador e Botão Escanear Novamente) */}
      <View style={styles.footer}>
          
          {/* Contador de Scans */}
          <View style={styles.countContainer}>
              <Text style={[styles.countTextLabel, { color: theme.textMuted }]}>
                  Scans Realizados:
              </Text>
              <Text style={[styles.countText, { color: theme.inputText }]}>
                  {count}
              </Text>
          </View>
          
          {/* Botão Escanear Novamente */}
          {scanned && (
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => setScanned(false)}
              >
                  <Text style={styles.buttonText}>Escanear Novamente</Text>
              </TouchableOpacity>
          )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold', padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5 },
  
  // Estilos do Footer e Contador
  footer: { 
      padding: 15, 
      alignItems: 'center', 
      flexDirection: 'row', 
      justifyContent: 'space-between' 
  },
  countContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      paddingLeft: 5,
  },
  countTextLabel: {
      fontSize: 16,
      marginRight: 5,
  },
  countText: {
      fontSize: 22,
      fontWeight: 'bold',
  },

  // Estilos de Botões
  button: { 
      backgroundColor: '#2196F3', 
      paddingVertical: 12, 
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      minWidth: 180, // Garante que o botão tenha um tamanho mínimo
  },
  buttonText: { 
      color: '#fff', 
      fontSize: 16, 
      fontWeight: 'bold' 
  },
  
  // Estilo para o Botão Voltar (flutuante)
  backButton: {
    position: 'absolute',
    top: 50, // Ajuste conforme a área segura do seu app
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  
  // Estilo para o Texto de Status (para centralizar na tela)
  statusText: {
      fontSize: 18, 
      fontWeight: '600', 
      textAlign: 'center'
  },
});