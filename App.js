
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './auth/authContext';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext'; 

// Telas
import LoginScreen from './screens/LoginScreen';
import TabNavigator from './screens/TabNavigator'; // Tabs para estudante
import ForgotPasswordScreen from './screens/ForgotScreen';
import CartScreen from './screens/CartScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import PaymentScreen from './screens/PaymentScreen';
import QRCodeScreen from './screens/QRCodeScreen';

// Novas telas para Admin
import AdminTabs from './screens/AdminTabs'; // Tabs para admin

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <ThemeProvider> 
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                
                {/* Login */}
                <Stack.Screen name="Login" component={LoginScreen} />

                {/* Tabs do Estudante */}
                <Stack.Screen name="MainTabs" component={TabNavigator} />

                {/* Tabs do Admin */}
                <Stack.Screen name="AdminTabs" component={AdminTabs} />

                {/* Outras telas */}
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Pagamento" component={PaymentScreen} />
                <Stack.Screen name="HistoricoScreen" component={HistoricoScreen} />
                <Stack.Screen name="QRCode" component={QRCodeScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
