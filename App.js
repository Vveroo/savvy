import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './auth/authContext';

// Telas
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'; 
import CardapioScreen from './screens/CardapioScreen';

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
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Cardapio" 
            component={CardapioScreen} 
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
