// screens/TabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native'; // ✅ Adicionado View para encapsular o emoji
import HomeScreen from './HomeScreen';
import CardapioScreen from './CardapioScreen';
import FavoritosScreen from './FavoritosScreen';
import HistoricoScreen from './HistoricoScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? '🏠' : '🏡';
          } else if (route.name === 'Cardapio') {
            iconName = focused ? '🍔' : '🍟';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? '🌟' : '⭐️';
          } else if (route.name === 'Historico') {
            iconName = focused ? '⏰' : '⏱️';
          }

          return (
            <View>
              <Text style={{ fontSize: size, color }}>{iconName}</Text>
            </View>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Cardapio" component={CardapioScreen} options={{ title: 'Menu' }} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} options={{ title: 'Favoritos' }} />
      <Tab.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Pedidos' }} />
    </Tab.Navigator>
  );
}
