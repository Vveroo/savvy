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
      /^[a-zA-Z0-9]+$/,
      "Matrícula inválida!"
    )
    .required("Obrigatório"),
  password: yup
    .string()
    .min(8, ({ min }) => `A senha deve ter ${min} caracteres`)
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/,
      "A senha deve conter pelo menos um caractere especial."
    )
    .required("Obrigatório"),
});

export default function Login() {
  const isDarkMode = useColorScheme() === "dark";
  const styles = getLoginStyles(isDarkMode);

  const navigation = useNavigation();
  const { signIn } = useUserContext();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (values) => {
    setIsLoading(true);
    const { matricula, password } = values;

    try {
      console.log('Tentando login com:', matricula);
      console.log('Tentando Supabase...');
      const res = await signIn(matricula, password);
      console.log('Resposta signIn:', res);

      if (res.success) {
        const usr = res.user;
        if (usr.role === "admin") {
          navigation.replace("AdminTabs");
        } else {
          navigation.replace("MainTabs");
        }
      } else {
        setApiError(res.error || "Erro ao fazer login");
      }
    } catch (error) {
      console.error('Erro no submit:', error);
      setApiError("Erro ao fazer login: " + error.message);
    } finally {
      setIsLoading(false);
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
