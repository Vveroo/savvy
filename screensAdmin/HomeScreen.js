import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { getHomeStyles } from "../stylesAdmin/homeStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const { user, logout } = useUserContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getHomeStyles(isDarkMode);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerAnim] = useState(new Animated.Value(-300));
  const navigation = useNavigation();

  // Estado da tabela
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadTable = async () => {
      try {
        const saved = await AsyncStorage.getItem("home_table");
        if (saved) setRows(JSON.parse(saved));
      } catch (err) {
        // ignore
      }
    };
    loadTable();
  }, []);

  const saveTable = async (newRows) => {
    setRows(newRows);
    await AsyncStorage.setItem("home_table", JSON.stringify(newRows));
  };

  const addRow = () => {
    const newRows = [...rows, { id: Date.now().toString(), col1: "", col2: "" }];
    saveTable(newRows);
  };

  const updateCell = (id, field, value) => {
    const newRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    saveTable(newRows);
  };

  const removeRow = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    saveTable(newRows);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Carregando...</Text>
      </View>
    );
  }

  const primeiroNome = user?.nome?.split(" ")[0] || "Usuário";

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
      {/* TopBar apenas com perfil */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.btnPerfil} onPress={toggleDrawer}>
          <Icon
            name="person-circle-outline"
            size={32}
            color={styles.icon.color}
          />
        </TouchableOpacity>
      </View>

      {/* Saudação */}
      <Text style={styles.greeting}>Olá {primeiroNome}!</Text>

      {/* Tabela Horários */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Horários</Text>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={localStyles.row}>
            <TextInput
              style={localStyles.cell}
              placeholder="Coluna 1"
              value={item.col1}
              onChangeText={(text) => updateCell(item.id, "col1", text)}
            />
            <TextInput
              style={localStyles.cell}
              placeholder="Coluna 2"
              value={item.col2}
              onChangeText={(text) => updateCell(item.id, "col2", text)}
            />
            <TouchableOpacity
              onPress={() => removeRow(item.id)}
              style={localStyles.deleteBtn}
            >
              <Text style={{ color: "#fff" }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity onPress={addRow} style={localStyles.addBtn}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>+ Adicionar Linha</Text>
      </TouchableOpacity>

      {/* Drawer lateral */}
      <Modal visible={drawerVisible} transparent animationType="none">
        <TouchableOpacity
          style={styles.drawerOverlay}
          activeOpacity={1}
          onPress={closeDrawer}
        >
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
                onPress={() => navigation.navigate("AdminScanner")}
              >
                <Icon
                  name="qr-code-outline"
                  size={22}
                  color={styles.icon.color}
                />
                <Text style={styles.drawerText}>Scanner Alunos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerButton}
                onPress={() => navigation.navigate("AdminDashboard")}
              >
                <Icon
                  name="speedometer-outline"
                  size={22}
                  color={styles.icon.color}
                />
                <Text style={styles.drawerText}>Dashboard</Text>
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

