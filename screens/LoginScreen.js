import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../auth/authContext";
import { useUserContext } from "../contexts/UserContext";
import { getLoginStyles } from "../styles/loginStyles";
import { useColorScheme } from "react-native";

const loginValidationSchema = yup.object().shape({
  matricula: yup
    .string()
    .matches(/^[a-zA-Z-_]+$/, "Matrícula inválida!")
    .required("Obrigatório"),
  password: yup
    .string()
    .min(8, ({ min }) => `A senha deve ter ${min} caracteres`)
    .required("Obrigatório"),
});

export default function Login() {
  const isDarkMode = useColorScheme() === "dark";
  const styles = getLoginStyles(isDarkMode);

  const { saveToken, saveUser } = useAuth();
  const navigation = useNavigation();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { addUser } = useUserContext();
  const [apiError, setApiError] = useState("");

  const submit = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userMatricula", values.matricula);

        saveToken(data.token);
        saveUser(values.matricula);
        addUser({ email: values.matricula });

        navigation.replace("MainTabs");
      } else {
        setApiError(data.message || "Credenciais inválidas.");
        setTimeout(() => setApiError(""), 4000);
      }
    } catch {
      setApiError("Não foi possível conectar à API.");
      setTimeout(() => setApiError(""), 4000);
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
          (errors.password && touched.password && errors.password) || (errors.matricula && touched.matricula && errors.matricula &&errors.password && touched.password && errors.password);

        return (
          <View style={styles.container}>
            {(formError || apiError) && (
              <View style={styles.errorBar}>
                <Text style={styles.errorText}>{formError || apiError}</Text>
              </View>
            )}

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
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
                secureTextEntry={!mostrarSenha}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Icon
                  name={mostrarSenha ? "eye-off" : "eye"}
                  size={25}
                  style={styles.icon}
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
