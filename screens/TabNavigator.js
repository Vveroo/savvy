
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../contexts/ThemeContext"; 
import { COLORS } from "../styles/colors";
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
        tabBarActiveTintColor: theme.button, 
        tabBarInactiveTintColor: theme.textMuted, 
        tabBarStyle: {
          backgroundColor: theme.background, 
          borderTopColor: theme.divider,
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
