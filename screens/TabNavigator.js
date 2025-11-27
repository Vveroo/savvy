// screens/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import HomeScreen from "./HomeScreen";
import CardapioScreen from "./CardapioScreen";
import Pedidos from './MeusPedidos';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconEmoji;

          if (route.name === "Home") {
            iconEmoji = focused ? "🏠" : "🏡";
          } else if (route.name === "Cardapio") {
            iconEmoji = focused ? "🍔" : "🍟";
          }

          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: size, color }}>{iconEmoji}</Text>
            </View>
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="Cardapio"
        component={CardapioScreen}
        options={{ title: "Menu" }}
      />
      <Tab.Screen
        name="Pedidos"
        component={Pedidos}
        options={{ title: "Meus Pedidos" }}
      />
    </Tab.Navigator>
  );
}