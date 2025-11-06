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
import { useAuth } from "../auth/authContext";
import { useUserContext } from "../contexts/UserContext";
import { getLoginStyles } from "../styles/loginStyles";

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

  const submit = (values) => {
    const fakeToken = "abc123"; // substitua por token real da API
    saveToken(fakeToken);
    saveUser(values.matricula);
    addUser({ email: values.matricula });
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-nova.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>É bom te ter aqui!</Text>

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
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Matrícula"
                placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
                keyboardType="default"
                onChangeText={handleChange("matricula")}
                onBlur={handleBlur("matricula")}
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
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
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
