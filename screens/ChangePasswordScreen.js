import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Não será mais usado
import { useUserContext } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { getChangePasswordStyles } from '../styles/changePasswordStyles';
import { supabase } from '../utils/supabaseClient'; // 🔑 Import do cliente Supabase

// Geração de código temporário (mantida, mas lembre-se da insegurança!)
const generateTempCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default function ChangePasswordScreen({ navigation }) {
  const { user } = useUserContext(); // Assumimos que user.id ou user.matricula está disponível
  const { isDarkMode, theme } = useTheme();
  const styles = getChangePasswordStyles(isDarkMode);

  const [step, setStep] = useState('request');
  const [tempCode, setTempCode] = useState(null);
  const [codeInput, setCodeInput] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [mostrarSenhas, setMostrarSenhas] = useState(false);
  const [codeExpireTime, setCodeExpireTime] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect para o temporizador do código (mantido)
  useEffect(() => {
    let timer;
    if (step === 'verify' && codeExpireTime) {
      timer = setInterval(() => {
        if (getTimeRemaining() === 0) {
          Alert.alert('Erro', 'Código expirado. Solicite um novo código.');
          setStep('request');
          setTempCode(null);
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, codeExpireTime]);

  const handleRequestCode = async () => {
    if (!senhaAtual) {
      Alert.alert('Erro', 'Digite sua senha atual');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Buscar a senha hash (simulada) do usuário logado no Supabase
      const { data: usuario, error: selectError } = await supabase
        .from('usuarios')
        .select('senha_hash') // Pegamos apenas a senha hash
        .eq('matricula', user.matricula) // Usa a matrícula do usuário logado
        .maybeSingle();

      if (selectError || !usuario) {
        Alert.alert('Erro', 'Falha ao buscar usuário. Verifique sua conexão ou RLS.');
        return;
      }

      // 2. SIMULAÇÃO de verificação de senha
      // Como a senha está salva como texto simples (inseguro, mas seu fluxo), comparamos diretamente
      if (usuario.senha_hash !== senhaAtual) {
        Alert.alert('Erro', 'Senha atual incorreta');
        return;
      }

      // 3. Gera e armazena o código de verificação
      const code = generateTempCode();
      setTempCode(code);
      setCodeExpireTime(Date.now() + 5 * 60 * 1000); 
      setShowCodeModal(true);
      setStep('verify');
      setSenhaAtual(''); 
    } catch (error) {
      Alert.alert('Erro', 'Falha ao processar a requisição: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = () => {
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

    setIsLoading(true);

    try {
      // 1. Atualiza a senha no Supabase
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ 
            senha_hash: novaSenha, // ⚠️ ATENÇÃO: INSEGURO. Salva a nova senha em texto simples.
            updated_at: new Date().toISOString()
        })
        .eq('matricula', user.matricula); // Usa a matrícula do usuário logado para identificar

      if (updateError) {
        console.error("Erro ao atualizar senha no Supabase:", updateError);
        Alert.alert('Erro', 'Falha ao atualizar senha no BD: ' + updateError.message);
        return;
      }
        
      Alert.alert('Sucesso!', 'Senha alterada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);

      setStep('request');
      setNovaSenha('');
      setConfirmSenha('');
      setTempCode(null);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar senha: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await Clipboard.setStringAsync(tempCode);
      Alert.alert('Copiado!', 'Código copiado para a área de transferência');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível copiar');
    }
  };

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
      
      {/* Indicador de Carregamento */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={{ color: theme.textPrimary, marginTop: 10 }}>Processando...</Text>
        </View>
      )}

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

          <TouchableOpacity style={styles.button} onPress={handleRequestCode} disabled={isLoading}>
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

          <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={isLoading}>
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
                <Text style={styles.modalSecondaryButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}