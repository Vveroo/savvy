
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../contexts/ThemeContext"; // ✅ pega o tema
import { COLORS } from "../styles/colors"; // ✅ importa as cores
import HomeScreen from "./HomeScreen";
import CardapioScreen from "./CardapioScreen";
import Pedidos from "./MeusPedidos";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cardapio") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "Pedidos") {
            iconName = focused ? "receipt" : "receipt-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.button, // ✅ azul SENAI ou azul vibrante
        tabBarInactiveTintColor: theme.textMuted, // ✅ cinza claro ou escuro
        tabBarStyle: {
          backgroundColor: theme.background, // ✅ fundo da barra
          borderTopColor: theme.divider, // ✅ linha superior
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Tab.Screen name="Cardapio" component={CardapioScreen} options={{ title: "Cardápio" }} />
      <Tab.Screen name="Pedidos" component={Pedidos} options={{ title: "Meus Pedidos" }} />
    </Tab.Navigator>
  );
}
