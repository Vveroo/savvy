import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './auth/authContext';

// Telas
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'; // 👈 nova tela adicionada

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} // ou true, se quiser mostrar o topo
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
