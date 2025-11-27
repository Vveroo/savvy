
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './auth/authContext';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext'; 
import { View, Text, ActivityIndicator } from 'react-native';

// Telas
import LoginScreen from './screens/LoginScreen';
import TabNavigator from './screens/TabNavigator'; // Tabs para estudante
import ForgotPasswordScreen from './screens/ForgotScreen';
import CartScreen from './screens/CartScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import PaymentScreen from './screens/PaymentScreen';
import QRCodeScreen from './screens/QRCodeScreen';

// Novas telas para Admin
import AdminTabs from './screensAdmin/AdminTabs'; // Tabs para admin

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : token.includes('admin') ? (
          <Stack.Screen name="AdminTabs" component={AdminTabs} />
        ) : (
          <Stack.Screen name="MainTabs" component={TabNavigator} />
        )}

        {/* Outras telas */}
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Pagamento" component={PaymentScreen} />
        <Stack.Screen name="HistoricoScreen" component={HistoricoScreen} />
        <Stack.Screen name="QRCode" component={QRCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <ThemeProvider>
            <AppNavigator />
          </ThemeProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
