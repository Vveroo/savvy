import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/loginStyles';
import { COLORS } from '../styles/colors';
import { validarEmail, validarSenha } from '../utils/validators';
import { useUserContext } from '../contexts/UserContext';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
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
        
        <Text style={styles.boasVindas}>Bem-Vindo!</Text>

        <View style={styles.campoInputs}>
          <TextInput
            style={[styles.input, errors.email && { borderColor: COLORS.error }]}
            placeholder="Usuário ou CPF"
            placeholderTextColor="#929292"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        </View>

        <View style={styles.campoInputs}>
          <View style={styles.btnMostrar}>
            <TextInput
              style={[
                styles.input,
                styles.senhaInput,
                errors.senha && { borderColor: COLORS.error },
              ]}
              placeholder="Senha"
              placeholderTextColor="#929292"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Text style={styles.mostrarEsconderSenha}>
                {mostrarSenha ? 'Ocultar' : 'Mostrar'}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
        </View>

        <TouchableOpacity>
          <Text style={styles.esqueciSenha}>Recuperar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnEntrar} onPress={handleEntrar}>
          <Text style={styles.txtBtnEntrar}>Entrar</Text>
        </TouchableOpacity>
      </View>
  );
}