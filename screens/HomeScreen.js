import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/homeStyles";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function HomeScreen({ navigation }) {
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const [userId] = useState("simon_riley"); // exemplo fixo, pode vir de contexto

  const handleGenerate = () => {
    if (userId.trim() !== "") {
      navigation.navigate("QRCode", { userId });
    }
  };

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
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Olá Simon Riley!</Text>

      <View style={styles.saldoBox}>
        <Text style={styles.saldoLabel}>Saldo em conta</Text>
        <Text style={styles.saldoValor}>
          R$ {mostrarSaldo ? "0,10" : "••••"}
        </Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Recarregar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleGenerate}
          >
            <Text style={styles.buttonText}>Ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
