import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  useColorScheme,
} from "react-native";
import { getHomeStyles } from "../styles/homeStyles";
import Icon from "react-native-vector-icons/Ionicons";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext"; // ✅ usando ThemeContext

export default function HomeScreen() {
  const { user, saldo, logout } = useUserContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getHomeStyles(isDarkMode);
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigation = useNavigation();

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

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja encerrar a sessão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: () => {
          logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.perfil}>
        {/* Botão perfil */}
        <TouchableOpacity
          style={styles.btnPerfil}
          onPress={() => setDrawerVisible(!drawerVisible)}
        >
          <Icon name="person-circle-outline" size={28} color={styles.icon.color} />
        </TouchableOpacity>

        <View style={styles.btnTopo}>
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

      {/* Saldo */}
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

      {/* Drawer lateral */}
      <Modal
        visible={drawerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDrawerVisible(false)}
      >
        <View style={styles.drawerOverlay}>
          <View style={styles.drawer}>
            <Text style={styles.drawerNome}>{user.nome}</Text>
            <Text style={styles.drawerMatricula}>Matrícula: {user.matricula}</Text>

            <TouchableOpacity style={styles.drawerButton} onPress={toggleTheme}>
              <Icon
                name={isDarkMode ? "sunny-outline" : "moon-outline"}
                size={22}
                color={styles.icon.color}
              />
              <Text style={styles.drawerText}>
                {isDarkMode ? "Modo Claro" : "Modo Escuro"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerButton} onPress={handleLogout}>
              <Icon name="log-out-outline" size={22} color={styles.icon.color} />
              <Text style={styles.drawerText}>Encerrar Sessão</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Icon name="key-outline" size={22} color={styles.icon.color} />
              <Text style={styles.drawerText}>Mudar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.navigate("HorariosScreen")}
            >
              <Icon name="time-outline" size={22} color={styles.icon.color} />
              <Text style={styles.drawerText}>Ver Horários</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.navigate("HistoricoScreen")}
            >
              <Icon name="document-text-outline" size={22} color={styles.icon.color} />
              <Text style={styles.drawerText}>Histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
