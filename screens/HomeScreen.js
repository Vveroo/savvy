import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/homeStyles";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const [userId] = useState("simon_riley");
  const primeiroNome = userId.split("_")[0];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.perfil}>
        <TouchableOpacity style={styles.btnPerfil}>
          <FontAwesome5 name="user-alt" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setMostrarSaldo(!mostrarSaldo)}>
          <Icon
            name={mostrarSaldo ? "eye-off" : "eye"}
            size={30}
            color="#007AFF" // azul moderno
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Olá {primeiroNome}!</Text>

      <View style={styles.saldoBox}>
        <Text style={styles.saldoLabel}>Saldo</Text>
        <Text style={styles.saldoValor}>
          R$ {mostrarSaldo ? "••••" : "0,10"}
        </Text>
      </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>
     

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>QR Code para: {primeiroNome}.</Text>
        <QRCode value={userId} size={200} />
      </View>
    </View>
  );
}
