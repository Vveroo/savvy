import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './auth/authContext';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext'; 

import LoginScreen from './screens/LoginScreen';
import TabNavigator from './screens/TabNavigator';
import ForgotPasswordScreen from './screens/ForgotScreen';
import CartScreen from './screens/CartScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import PaymentScreen from './screens/PaymentScreen';
import QRCodeScreen from './screens/QRCodeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <ThemeProvider> 
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MainTabs"
                  component={TabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPasswordScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Cart"
                  component={CartScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Pagamento"
                  component={PaymentScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HistoricoScreen"
                  component={HistoricoScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="QRCode"
                  component={QRCodeScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
