import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
} from "react-native";
import { getHomeStyles } from "../styles/homeStyles";
import Icon from "react-native-vector-icons/Ionicons";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {
  const { user, saldo, logout } = useUserContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getHomeStyles(isDarkMode);
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerAnim] = useState(new Animated.Value(-300));
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

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerVisible(false));
  };

  const toggleDrawer = () => {
    drawerVisible ? closeDrawer() : openDrawer();
  };

  const handleLogout = () => {
    closeDrawer();
    setTimeout(() => {
      Alert.alert(
        "Sair",
        "Tem certeza que deseja encerrar a sessão?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sair",
            onPress: async () => {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            },
          },
        ],
        { cancelable: true }
      );
    }, 300);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.btnPerfil} onPress={toggleDrawer}>
          <Icon
            name="person-circle-outline"
            size={32}
            color={styles.icon.color}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMostrarSaldo(!mostrarSaldo)}>
          <Icon
            name={mostrarSaldo ? "eye" : "eye-off"}
            size={30}
            color={styles.icon.color}
          />
        </TouchableOpacity>
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

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.saldoValor}>
            R$ {!mostrarSaldo ? "••••" : saldoFormatado}
          </Text>

          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={styles.icon.color}
          />
        </View>
      </TouchableOpacity>

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <Text style={styles.qrLabel}>QR Code para: {primeiroNome}</Text>
        <QRCode value={qrValue} size={300} />
      </View>
      {/* Drawer lateral com animação */}
      <Modal visible={drawerVisible} transparent animationType="none">
        {/* Overlay clicável */}
        <TouchableOpacity
          style={styles.drawerOverlay}
          activeOpacity={1}
          onPress={closeDrawer} // Fecha ao clicar fora
        >
          {/* Drawer NÃO fecha ao clicar dentro */}
          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <Text style={styles.drawerNome}>{user.nome}</Text>
              <Text style={styles.drawerMatricula}>
                Matrícula: {user.matricula}
              </Text>

              <TouchableOpacity
                style={styles.drawerButton}
                onPress={toggleTheme}
              >
                <Icon
                  name={isDarkMode ? "sunny-outline" : "moon-outline"}
                  size={22}
                  color={styles.icon.color}
                />
                <Text style={styles.drawerText}>
                  {isDarkMode ? "Modo Claro" : "Modo Escuro"}
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.drawerButton}
                onPress={() => navigation.navigate("TrocarSenhaScreen")}
              >
                <Icon name="key-outline" size={22} color={styles.icon.color} />
                <Text style={styles.drawerText}>Mudar Senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerButton}
                onPress={() => navigation.navigate("HistoricoScreen")}
              >
                <Icon
                  name="document-text-outline"
                  size={22}
                  color={styles.icon.color}
                />
                <Text style={styles.drawerText}>Histórico</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.drawerButton}
                onPress={handleLogout}
              >
                <Icon
                  name="log-out-outline"
                  size={22}
                  color={styles.icon.color}
                />
                <Text style={styles.drawerText}>Encerrar Sessão</Text>
              </TouchableOpacity>

            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
