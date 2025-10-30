// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './contexts/UserContext';
import LoginScreen from './screens/LoginScreen';
// *IMPORTANTE: Remova essas linhas ou substitua por TabNavigator*
// import HomeScreen from './screens/HomeScreen';
// import CardapioScreen from './screens/CardapioScreen';
// import CardapioScreen from './screens/CardapioScreen'; // (Duplicada no seu original)
// import CardapioScreen from './screens/CardapioScreen'; // (Duplicada no seu original)

// ✅ Importe APENAS o componente do Navegador de Abas
import TabNavigator from './screens/TabNavigator'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Oculta o cabeçalho do login */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> 
          
          {/* ✅ Nomeie a ROTA principal de abas como 'MainTabs' (ou outro nome único) */}
          {/* Esta rota APONTA para o componente que contém a navegação por abas */}
          <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
          
          {/* ❌ Certifique-se de que NÃO HÁ MAIS estas telas aqui:
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cardapio" component={CardapioScreen} />
          ... */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}