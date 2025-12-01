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
  ScrollView,
} from "react-native";
import { getHomeStyles } from "../stylesAdmin/homeStyles";
import { getCommonStyles } from "../styles/commonStyles";
import { schedulesMock } from "../utils/mockData";
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

  // Shared styles
  const common = getCommonStyles(isDarkMode);

  // Schedules state per turno (Manha, Tarde, Noite)
  const [schedules, setSchedules] = useState({ Manha: [], Tarde: [], Noite: [] });
  const [editingTurno, setEditingTurno] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const saved = await AsyncStorage.getItem("schedules");
        if (saved) {
          setSchedules(JSON.parse(saved));
        } else {
          setSchedules(schedulesMock);
        }
      } catch (err) {
        setSchedules(schedulesMock);
      }
    };
    loadSchedules();
  }, []);

  const saveSchedules = async (newSchedules) => {
    setSchedules(newSchedules);
    await AsyncStorage.setItem("schedules", JSON.stringify(newSchedules));
  };

  const openEdit = (turno) => {
    setEditingTurno(turno);
    setEditModalVisible(true);
  };

  const addScheduleRow = (turno) => {
    const list = schedules[turno] || [];
    const newList = [...list, { id: Date.now().toString(), turma: "", horario: "" }];
    const newSchedules = { ...schedules, [turno]: newList };
    saveSchedules(newSchedules);
  };

  const updateScheduleCell = (turno, id, field, value) => {
    const list = schedules[turno] || [];
    const newList = list.map((r) => (r.id === id ? { ...r, [field]: value } : r));
    const newSchedules = { ...schedules, [turno]: newList };
    saveSchedules(newSchedules);
  };

  const removeScheduleRow = (turno, id) => {
    const list = schedules[turno] || [];
    const newList = list.filter((r) => r.id !== id);
    const newSchedules = { ...schedules, [turno]: newList };
    saveSchedules(newSchedules);
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
          <Icon name="person-circle-outline" size={32} color={styles.icon.color} />
        </TouchableOpacity>
      </View>

      {/* Saudação */}
      <Text style={styles.greeting}>Olá {primeiroNome}!</Text>

      {/* Tabelas lado a lado com scroll horizontal */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Horários</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
        {["Manha", "Tarde", "Noite"].map((turno) => (
          <View key={turno} style={[common.card, { width: 300, marginRight: 16 }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={common.title}>{turno}</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity onPress={() => addScheduleRow(turno)} style={common.editButton}>
                  <Text style={{ color: "#fff" }}>+ Linha</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEdit(turno)} style={common.editButton}>
                  <Text style={{ color: "#fff" }}>Editar Tabela</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={common.tableHeader}>
              <Text style={[common.cellText, common.colTurma]}>Turma</Text>
              <Text style={[common.cellText, common.colHorario]}>Horário</Text>
            </View>

            {(schedules[turno] || []).map((r) => (
              <View key={r.id} style={common.tableRow}>
                <Text style={[common.cellText, common.colTurma]}>{r.turma || "—"}</Text>
                <Text style={[common.cellText, common.colHorario]}>{r.horario || "—"}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Edit modal for turno */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <View style={common.modalCard}>
            <Text style={common.title}>Editando: {editingTurno}</Text>
            <FlatList
              data={schedules[editingTurno] || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                  <TextInput
                    placeholder="Turma"
                    placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
                    style={[common.input, { flex: 1, marginRight: 8 }]}
                    value={item.turma}
                    onChangeText={(text) => updateScheduleCell(editingTurno, item.id, "turma", text)}
                  />
                  <TextInput
                    placeholder="Horário"
                    placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
                    style={[common.input, { flex: 1, marginRight: 8 }]}
                    value={item.horario}
                    onChangeText={(text) => updateScheduleCell(editingTurno, item.id, "horario", text)}
                  />
                  <TouchableOpacity
                    onPress={() => removeScheduleRow(editingTurno, item.id)}
                    style={{ backgroundColor: "#ef4444", padding: 8, borderRadius: 6 }}
                  >
                    <Text style={{ color: "#fff" }}>Remover</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
              <TouchableOpacity onPress={() => addScheduleRow(editingTurno)} style={common.btn}>
                <Text style={common.btnText}>Adicionar Linha</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={[common.btn, { backgroundColor: "#6B7280" }]}
              >
                <Text style={common.btnText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
            <TouchableOpacity activeOpacity={1} onPress={() => { }}>
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
