import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, useColorScheme } from "react-native";
import { getHomeStyles } from "../styles/homeStyles";
import Icon from "react-native-vector-icons/Ionicons";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../contexts/UserContext";

export default function HomeScreen() {
  const { user, saldo, logout } = useUserContext();
  const systemScheme = useColorScheme(); // detecta tema do sistema
  const [theme, setTheme] = useState(systemScheme); // estado controlado
  const styles = getHomeStyles(theme === "dark");
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const navigation = useNavigation();

  // se o sistema mudar, atualiza o estado
  useEffect(() => {
    setTheme(systemScheme);
  }, [systemScheme]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Carregando...</Text>
      </View>
    );
  }

  const primeiroNome = user?.nome?.split(" ")[0] || "Usuário";
  const qrValue = user.matricula;
  const saldoFormatado = saldo.toFixed(2).replace(".", ",");

      { text: "Cancelar", style: "cancel" },
const handleLogout = () => {
  console.log("Botão de logout clicado!");

  setTimeout(() => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja encerrar a sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  }, 50);
};

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.perfil}>
        <TouchableOpacity style={styles.btnPerfil} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color={styles.icon.color} />
        </TouchableOpacity>

        <View style={styles.btnTopo}>
          {/* Botão alternar tema */}
          <TouchableOpacity style={styles.btnIcon} onPress={toggleTheme}>
            <Icon
              name={theme === "dark" ? "sunny-outline" : "moon-outline"}
              size={30}
              color={styles.icon.color}
              style={styles.icon}
            />
          </TouchableOpacity>

          {/* Mostrar/ocultar saldo */}
          <TouchableOpacity onPress={() => setMostrarSaldo(!mostrarSaldo)}>
            <Icon
              name={mostrarSaldo ? "eye" : "eye-off"}
              size={30}
              color={styles.icon.color}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Saudação */}
      <Text style={styles.greeting}>Olá {primeiroNome}!</Text>

      {/* Saldo como botão */}
      <TouchableOpacity
        style={styles.saldoBox}
        onPress={() => navigation.navigate("HistoricoScreen")}
        activeOpacity={0.8}
      >
        <Text style={styles.saldoLabel}>Saldo</Text>
        <Text style={styles.saldoValor}>
          R$ {!mostrarSaldo ? "••••" : saldoFormatado}
        </Text>
      </TouchableOpacity>

      {/* Botão de ação */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Recarregar</Text>
        </TouchableOpacity>
      </View>

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <Text style={styles.qrLabel}>QR Code para: {primeiroNome}</Text>
        <QRCode value={qrValue} size={200} />
      </View>
    </View>
  );
}
