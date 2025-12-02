import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getForgotPasswordStyles } from "../styles/forgotPasswordStyles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from "../contexts/ThemeContext";

const ForgotPasswordSchema = Yup.object().shape({
  matricula: Yup.string().required('Matrícula obrigatória'),
});

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
    try {
      const usuariosJSON = await AsyncStorage.getItem('usuarios');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      
      const usuarioEncontrado = usuarios.find(u => u.matricula === values.matricula);

      if (!usuarioEncontrado) {
        Alert.alert('Erro', 'Matrícula não encontrada.');
        return;
      }

      const code = generateResetCode();
      setResetCode(code);
      setUserMatricula(values.matricula);

      const usuarioIndex = usuarios.findIndex(u => u.matricula === values.matricula);
      usuarios[usuarioIndex].senha = code;
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));

      setShowCodeModal(true);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao procurar matrícula: ' + error.message);
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
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
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

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Gerar código</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.cancelButtonText}>Voltar ao Login</Text>
              </TouchableOpacity>
            </>
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
