import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/homeStyles";
import Icon from "react-native-vector-icons/Ionicons";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../contexts/UserContext"; 

export default function HomeScreen() {
  // OBTENEMOS LOS DATOS REALES DEL CONTEXTO
  const { user, saldo, logout } = useUserContext(); 
  const { theme, toggleTheme } = useContext(ThemeContext); // usar o contexto corretamente
  
  // Cambiado a 'false' para que el saldo esté oculto por defecto
  const [mostrarSaldo, setMostrarSaldo] = useState(false); 
  const navigation = useNavigation();

  // TRATAMIENTO DE SEGURIDAD: Redirecciona al Login si no hay usuario
  if (!user) {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
    }); 
    return <View><Text>Aguarde...</Text></View>;
  }

  // USAR DATOS DEL USUARIO
  const primeiroNome = user.nome.split(" ")[0]; 
  const qrValue = user.matricula; 
  const saldoFormatado = saldo.toFixed(2).replace(".", ","); 

  const handleLogout = () => {
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
                } 
            },
        ]
    );
  };
    
  return (
    <View style={styles.container}>
      <View style={styles.perfil}>
        
        {/* Botón de LOGOUT */}
        <TouchableOpacity style={styles.btnPerfil} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="black" /> 
        </TouchableOpacity>
        
        {/* Botón para mostrar/ocultar saldo */}
        <TouchableOpacity onPress={() => setMostrarSaldo(!mostrarSaldo)}>
          <Icon
            name={mostrarSaldo ? "eye" : "eye-off"}
            size={30}
            color="#007AFF"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* SALUDO CON NOMBRE REAL */}
      <Text style={styles.greeting}>Olá {primeiroNome}!</Text>

      <View style={styles.saldoBox}>
        <Text style={styles.saldoLabel}>Saldo</Text>
        <Text style={styles.saldoValor}>
          R$ {!mostrarSaldo ? "••••" : saldoFormatado}
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Recarregar</Text>
        </TouchableOpacity>

        {/* Botão para mudar tema */}
        <TouchableOpacity style={styles.actionButton} onPress={toggleTheme}>
          <Text style={styles.buttonText}>Mudar tema ({theme})</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 5 }}>Matrícula: {user.matricula}</Text>
        <Text style={{ marginBottom: 20 }}>QR Code para: {primeiroNome}.</Text>
        <QRCode value={qrValue} size={200} />
      </View>
    </View>
  );
}
