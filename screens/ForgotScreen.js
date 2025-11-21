import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from "../styles/forgotStyles";
import { useNavigation } from '@react-navigation/native';

// Validação simples do campo de e-mail
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
});

// Função para gerar código aleatório de 8 caracteres (inclui especiais)
const generateResetCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}<>?';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const handleSubmit = async (values) => {
    // Gera código aleatório
    const resetCode = generateResetCode();

    try {
      // Envia para o servidor para atualizar a senha provisória
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, tempPassword: resetCode }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Código gerado',
          `Use este código provisório para fazer login:\n\n${resetCode}`
        );
        // Navega para tela de redefinição passando o código
        navigation.navigate('ResetPassword', { email: values.email, resetCode });
      } else {
        Alert.alert('Erro', data.message || 'Não foi possível definir a senha provisória.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu sua senha?</Text>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Gerar código</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.voltar}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.voltarLogin}>Voltar ao Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}
