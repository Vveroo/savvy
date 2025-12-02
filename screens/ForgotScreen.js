import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from "../contexts/ThemeContext";
import { supabase } from '../utils/supabaseClient'; 
import { getForgotPasswordStyles } from "../styles/forgotPasswordStyles"; 

const ForgotPasswordSchema = Yup.object().shape({
  matricula: Yup.string().required('Matrícula obrigatória'),
});

// Função para gerar um código alfanumérico
const generateResetCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { isDarkMode, theme } = useTheme();
  const styles = getForgotPasswordStyles(isDarkMode);
  const [resetCode, setResetCode] = useState(null);
  const [userMatricula, setUserMatricula] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopyCode = async () => {
    try {
      await Clipboard.setStringAsync(resetCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível copiar o código.');
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // 1. Tenta encontrar o usuário pela Matrícula
      const { data: usuario, error: selectError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('matricula', values.matricula)
        .single(); // ✅ corrigido

      if (selectError || !usuario) {
        Alert.alert('Erro', 'Matrícula não encontrada. Verifique as Políticas RLS (SELECT).');
        return;
      }

      // 2. Gera o código de redefinição
      const code = generateResetCode();
      setResetCode(code);
      setUserMatricula(values.matricula);

      // 3. Atualiza a senha (senha_hash) com o código gerado
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ 
            senha_hash: code, 
            updated_at: new Date().toISOString()
        })
        .eq('id', usuario.id); 

      if (updateError) {
        console.error("Erro ao atualizar senha no Supabase:", updateError);
        Alert.alert('Erro', 'Falha ao atualizar a senha no BD. Verifique as Políticas RLS (UPDATE).');
        return;
      }

      // 4. Mostra o modal de sucesso
      setShowCodeModal(true);

    } catch (error) {
      console.error("Erro no processo de redefinição:", error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowCodeModal(false);
    setResetCode(null);
    setUserMatricula(null);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu sua senha?</Text>

      {!resetCode ? (
        <Formik
          initialValues={{ matricula: '' }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit: formikSubmit, values, errors, touched }) => (
            <View>
              <Text style={styles.subtitle}>
                Digite sua matrícula de estudante
              </Text>

              <View style={styles.inputContainer}>
                <Icon name="person" size={20} color={theme.inputText} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Matrícula"
                  placeholderTextColor={theme.textMuted}
                  autoCapitalize="none"
                  onChangeText={handleChange('matricula')}
                  onBlur={handleBlur('matricula')}
                  value={values.matricula}
                />
              </View>
              {errors.matricula && touched.matricula && (
                <Text style={styles.error}>{errors.matricula}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={formikSubmit} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Gerar código</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.cancelButtonText}>Voltar ao Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      ) : null}

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
              <Text style={styles.codeText}>{resetCode}</Text>
            </View>

            <Text style={styles.modalText}>Use este código para redefinir sua senha</Text>

            <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
              <Icon name="copy" size={20} color="#fff" />
              <Text style={styles.copyButtonText}>{codeCopied ? 'Copiado!' : 'Copiar Código'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueButton} onPress={handleCloseModal}>
              <Text style={styles.continueButtonText}>Ir para Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
