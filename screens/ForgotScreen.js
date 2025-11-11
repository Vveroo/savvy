import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from "../styles/forgotStyles";
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
});

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('https://seuservidor.com/api/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Código enviado', 'Verifique seu e-mail para continuar.');
        navigation.navigate('ResetPassword', { email: values.email });
      } else {
        Alert.alert('Erro', data.message || 'Não foi possível enviar o código.');
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
              <Text style={styles.buttonText}>Enviar código</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.voltar} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.voltarLogin}>Voltar ao Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}
