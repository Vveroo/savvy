import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/homeStyles";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import QRCode from "react-native-qrcode-svg";
import { getHomeStyles } from "../styles/homeStyles";

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const styles = getHomeStyles(isDarkMode);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const [userId] = useState("simon_riley");
  const primeiroNome = userId.split("_")[0];

  return (
    <View style={styles.container}>
      <View style={styles.perfil}>
        <TouchableOpacity style={styles.btnPerfil}>
          <FontAwesome5 name="user-alt" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ver}
          onPress={() => setMostrarSaldo(!mostrarSaldo)}
        >
          <Icon
            name={mostrarSaldo ? "eye-off" : "eye"}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Olá {primeiroNome}!</Text>

      <TouchableOpacity
        style={styles.saldoBox}
        onPress={() => console.log("Saldo clicado!")}
      >
        <View style={styles.saldoHeader}>
          <Text style={styles.saldoLabel}>Saldo</Text>
          <Icon name="chevron-forward" size={24} color="#000" />
        </View>

        <Text style={styles.saldoValor}>
          R$ {mostrarSaldo ? "••••" : "0,10"}
        </Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log("Recarregar")}
          >
            <Text style={styles.buttonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>QR Code de: {userId}</Text>
        <QRCode value={userId} size={300} />
      </View>
    </View>
  );
}
