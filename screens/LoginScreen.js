import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../contexts/UserContext";
import { getLoginStyles } from "../styles/loginStyles";

const loginValidationSchema = yup.object().shape({
  matricula: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:,.?\/|\\~]+$/,
      "Matrícula inválida!"
    )
    .required("Obrigatório"),
  password: yup
    .string()
    .min(8, ({ min }) => `A senha deve ter ${min} caracteres`)
    .required("Obrigatório"),
});

export default function Login() {
  const isDarkMode = useColorScheme() === "dark";
  const styles = getLoginStyles(isDarkMode);

  const navigation = useNavigation();
  const { login } = useUserContext();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [apiError, setApiError] = useState("");

  const submit = async (values) => {
    const fixedLogins = {
      admin: {
        matricula: "admin",
        password: "admin1234",
        role: "admin",
        saldo: 0,
      },
      estudante: {
        matricula: "estudante",
        password: "estudante1234",
        role: "student",
        saldo: 100.0,
      },
    };

    const { matricula, password } = values;

    try {
      let fixedUser = Object.values(fixedLogins).find(
        (user) => user.matricula === matricula && user.password === password
      );

      if (!fixedUser) {
        const usuariosJSON = await AsyncStorage.getItem('usuarios');
        const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
        const usuarioEncontrado = usuarios.find(
          (u) => u.matricula === matricula && u.senha === password
        );

        if (usuarioEncontrado) {
          fixedUser = {
            matricula: usuarioEncontrado.matricula,
            role: usuarioEncontrado.role || 'student',
            saldo: usuarioEncontrado.saldo || 100.0,
          };
        }
      }

      if (fixedUser) {
        const token = `fixed-token-${fixedUser.role}`;
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userMatricula", matricula);

        login({
          nome: matricula,
          matricula,
          role: fixedUser.role,
          saldo: fixedUser.saldo,
        });

        if (fixedUser.role === "admin") {
          navigation.replace("AdminTabs");
        } else {
          navigation.replace("MainTabs");
        }
      } else {
        setApiError("Matrícula ou senha incorreta");
      }
    } catch (error) {
      setApiError("Erro ao fazer login: " + error.message);
    }
  };

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{ matricula: "", password: "" }}
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
      }) => {
        const formError =
          (errors.matricula && touched.matricula && errors.matricula) ||
          (errors.password && touched.password && errors.password);

        return (
          <View style={styles.container}>
            {(formError || apiError) && (
              <View style={styles.errorBar}>
                <Text style={styles.errorText}>{formError || apiError}</Text>
              </View>
            )}

            <Image
              source={require("../assets/logo-nova.png")}
              style={{ width: 310, height: 45, marginBottom: 20 }}
            />

            <Text style={styles.title}>É bom te ter aqui!</Text>

            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Matrícula"
                placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
                onChangeText={handleChange("matricula")}
                onBlur={handleBlur("matricula")}
                value={values.matricula}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                placeholder="Senha"
                placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
                secureTextEntry={!mostrarSenha}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={styles.eyeIcon}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon
                  name={mostrarSenha ? "eye-off" : "eye"}
                  size={25}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPassword}>Recuperar senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
}
