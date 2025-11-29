import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { getChangePasswordStyles } from '../styles/changePasswordStyles';

// Gerar código temporário
const generateTempCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default function ChangePasswordScreen({ navigation }) {
  const { user } = useUserContext();
  const { isDarkMode, theme } = useTheme();
  const styles = getChangePasswordStyles(isDarkMode);

  const [step, setStep] = useState('request'); // 'request', 'verify', 'change'
  const [tempCode, setTempCode] = useState(null);
  const [codeInput, setCodeInput] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [mostrarSenhas, setMostrarSenhas] = useState(false);
  const [codeExpireTime, setCodeExpireTime] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Passo 1: Solicitar código
  const handleRequestCode = async () => {
    if (!senhaAtual) {
      Alert.alert('Erro', 'Digite sua senha atual');
      return;
    }

    try {
      // Verifica se a senha atual está correta
      const usuariosJSON = await AsyncStorage.getItem('usuarios');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      
      const usuarioEncontrado = usuarios.find(u => u.matricula === user.matricula);

      if (!usuarioEncontrado || usuarioEncontrado.senha !== senhaAtual) {
        Alert.alert('Erro', 'Senha atual incorreta');
        return;
      }

      // Gera código temporário (válido por 5 minutos)
      const code = generateTempCode();
      setTempCode(code);
      setCodeExpireTime(Date.now() + 5 * 60 * 1000); // 5 minutos
      setShowCodeModal(true);
      setStep('verify');
      setSenhaAtual(''); // Limpa o campo
    } catch (error) {
      Alert.alert('Erro', 'Falha ao processar: ' + error.message);
    }
  };

  // Passo 2: Verificar código
  const handleVerifyCode = () => {
    // Verifica se o código ainda é válido
    if (Date.now() > codeExpireTime) {
      Alert.alert('Erro', 'Código expirado. Solicite um novo código.');
      setStep('request');
      setTempCode(null);
      return;
    }

    if (codeInput !== tempCode) {
      Alert.alert('Erro', 'Código inválido');
      return;
    }

    setShowCodeModal(false);
    setStep('change');
    setCodeInput('');
  };

  // Passo 3: Mudar senha
  const handleChangePassword = async () => {
    if (!novaSenha || !confirmSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (novaSenha !== confirmSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    try {
      // Atualiza a senha no AsyncStorage
      const usuariosJSON = await AsyncStorage.getItem('usuarios');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      
      const usuarioIndex = usuarios.findIndex(u => u.matricula === user.matricula);
      if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].senha = novaSenha;
        await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        Alert.alert('Sucesso!', 'Senha alterada com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);

        // Limpa os campos
        setStep('request');
        setNovaSenha('');
        setConfirmSenha('');
        setTempCode(null);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar senha: ' + error.message);
    }
  };

  const handleCopyCode = async () => {
    try {
      await Clipboard.setString(tempCode);
      Alert.alert('Copiado!', 'Código copiado para a área de transferência');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível copiar');
    }
  };

  // Calcular tempo restante
  const getTimeRemaining = () => {
    if (!codeExpireTime) return 0;
    const remaining = Math.max(0, Math.ceil((codeExpireTime - Date.now()) / 1000));
    return remaining;
  };

  return (
    <View style={[styles.container, { paddingTop: 20 }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mudar Senha</Text>
      </View>

      {step === 'request' && (
        <View>
          <Text style={styles.info}>Digite sua senha atual para continuar</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha atual"
              placeholderTextColor={theme.textMuted}
              secureTextEntry={!mostrarSenhas}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
            />
            <TouchableOpacity onPress={() => setMostrarSenhas(!mostrarSenhas)} style={styles.eyeIcon}>
              <Icon name={mostrarSenhas ? 'eye' : 'eye-off'} size={20} color={isDarkMode ? '#ddd' : '#666'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRequestCode}>
            <Text style={styles.buttonText}>Solicitar Código</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 'verify' && (
        <View>
          <Text style={styles.info}>Um código foi gerado. Use-o para validar a alteração de senha.</Text>
          <Text style={styles.expirationWarning}>⏱️ Código expira em: {getTimeRemaining()}s</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite o código"
              placeholderTextColor={theme.textMuted}
              autoCapitalize="none"
              value={codeInput}
              onChangeText={setCodeInput}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verificar Código</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { marginTop: 10, backgroundColor: '#999' }]}
            onPress={() => {
              setStep('request');
              setTempCode(null);
              setCodeInput('');
            }}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 'change' && (
        <View>
          <Text style={styles.info}>Digite sua nova senha</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              placeholderTextColor={theme.textMuted}
              secureTextEntry={!mostrarSenhas}
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenhas(!mostrarSenhas)} style={styles.eyeIcon}>
              <Icon name={mostrarSenhas ? 'eye' : 'eye-off'} size={20} color={isDarkMode ? '#ddd' : '#666'} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirmar nova senha"
              placeholderTextColor={theme.textMuted}
              secureTextEntry={!mostrarSenhas}
              value={confirmSenha}
              onChangeText={setConfirmSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenhas(!mostrarSenhas)} style={styles.eyeIcon}>
              <Icon name={mostrarSenhas ? 'eye' : 'eye-off'} size={20} color={isDarkMode ? '#ddd' : '#666'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal do código */}
      <Modal
        visible={showCodeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCodeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>✓ Código Gerado!</Text>

            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{tempCode}</Text>
            </View>

            <Text style={styles.modalText}>Código válido por 5 minutos</Text>
            <Text style={styles.modalText}>Use este código para validar a alteração de senha</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
                <Icon name="copy" size={20} color="#fff" />
                <Text style={styles.copyButtonText}>Copiar Código</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalSecondaryButton} onPress={() => setShowCodeModal(false)}>
                <Text style={styles.modalSecondaryButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
