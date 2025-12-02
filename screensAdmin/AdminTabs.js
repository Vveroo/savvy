// AdminTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../styles/colors';
import HomeScreen from "./HomeScreen";
import PedidosScreen from "./AdminPedidos";
import CardapioScreen from "./CardapioScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let name = 'help-circle';
          if (route.name === 'Home') {
            name = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cardapio') {
            name = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Pedidos') {
            name = focused ? 'receipt' : 'receipt-outline';
          }
          return <Icon name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.button,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: { backgroundColor: theme.background },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Tab.Screen name="Cardapio" component={CardapioScreen} options={{ title: "Menu" }} />
      <Tab.Screen name="Pedidos" component={PedidosScreen} options={{ title: "Pedidos" }} />
    </Tab.Navigator>
  );
}
