import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/forgotStyles'; // ou crie um novo estilo específico

const ResetPasswordSchema = Yup.object().shape({
  code: Yup.string().required('Código obrigatório'),
  password: Yup.string().min(8, 'Mínimo 8 caracteres').required('Senha obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Senhas não coincidem')
    .required('Confirmação obrigatória'),
});

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  const handleReset = async (values) => {
    try {
      const response = await fetch('https://seuservidor.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: values.code,
          newPassword: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
        navigation.replace('Login');
      } else {
        Alert.alert('Erro', data.message || 'Código inválido ou expirado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir senha</Text>

      <Formik
        initialValues={{ code: '', password: '', confirmPassword: '' }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleReset}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Código recebido"
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              value={values.code}
            />
            {errors.code && touched.code && <Text style={styles.error}>{errors.code}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Confirmar nova senha"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Redefinir senha</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}
