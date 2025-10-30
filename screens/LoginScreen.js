import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../auth/authContext';
import { styles } from '../styles/loginStyles';

const loginValidationSchema = yup.object().shape({
  matricula: yup
    .string()
    .matches(/^[a-zA-Z-_]+$/, 'Matrícula inválida!')
    .required('Obrigatório'),
  password: yup
    .string()
    .min(8, ({ min }) => `A senha deve ter ${min} caracteres`)
    .required('Obrigatório'),
});

export default function Login() {
  const { saveToken, saveUser } = useAuth();
  const navigation = useNavigation();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errors, setErrors] = useState({});
  const { addUser } = useUserContext();

 const handleEntrar = () => {
    const novosErros = {};
    if (!validarEmail(email)) novosErros.email = 'Login inválido.';
    if (!validarSenha(senha))
      novosErros.senha = 'Mínimo 8 caracteres, 1 maiúscula e 1 caractere especial.';
    setErrors(novosErros);

    if (Object.keys(novosErros).length === 0) {
      addUser({ email });
      //navigation.navigate('Home'); // voltar para a tela anterior na pilha de navegação
      navigation.replace('Home');  //Substitui a pilha de navegação para evitar voltar ao login
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>É bom te ter aqui!</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ matricula: '', password: '' }}
        onSubmit={submit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Matrícula"
                keyboardType="string"
                onChangeText={handleChange('matricula')}
                onBlur={handleBlur('matricula')}
                value={values.matricula}
              />
            </View>
            {errors.matricula && touched.matricula && (
              <Text style={styles.errorText}>{errors.matricula}</Text>
            )}

            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={!mostrarSenha}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Text style={styles.mostrarEsconderSenha}>
                  {mostrarSenha ? (
                    <Icon name="eye-off" size={25} style={styles.icon} />
                  ) : (
                    <Icon name="eye" size={25} style={styles.icon} />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.forgotPassword}>Recuperar senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}