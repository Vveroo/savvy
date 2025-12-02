import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CardapioProvider } from './contexts/CardapioContext';

// Telas
import LoginScreen from './screens/LoginScreen';
import TabNavigator from './screens/TabNavigator'; 
import ForgotPasswordScreen from './screens/ForgotScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import CartScreen from './screens/CartScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import RechargeScreen from './screens/RechargeScreen';

// Admin
import AdminTabs from './screensAdmin/AdminTabs';
import AdminDashboard from './screensAdmin/AdminDashboard';
import AdminOrderDetails from './screensAdmin/AdminOrderDetails';
import AdminHistorico from './screensAdmin/AdminHistorico';
import AdminScanner from './screensAdmin/AdminScanner';
import AdminProdutoEditor from './screensAdmin/AdminProdutoEditor';

const Stack = createNativeStackNavigator();

const initializeUsers = async () => {
  try {
    const existingUsers = await AsyncStorage.getItem('usuarios');
    if (!existingUsers) {
      const defaultUsers = [
        {
          matricula: 'admin',
          senha: 'admin1234',
          role: 'admin',
          saldo: 0,
        },
        {
          matricula: 'estudante',
          senha: 'estudante1234',
          role: 'student',
          saldo: 100.0,
        },
      ];
      await AsyncStorage.setItem('usuarios', JSON.stringify(defaultUsers));
    }
  } catch (error) {
    console.log('Erro ao inicializar usuários:', error);
  }
};

export default function App() {
  useEffect(() => {
    initializeUsers();
  }, []);

  return (
    <UserProvider>
      <CartProvider>
        <ThemeProvider>
          <CardapioProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="MainTabs" component={TabNavigator} />
                <Stack.Screen name="AdminTabs" component={AdminTabs} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
                <Stack.Screen name="AdminOrderDetails" component={AdminOrderDetails} />
                <Stack.Screen name="AdminHistorico" component={AdminHistorico} />
                <Stack.Screen name="AdminScanner" component={AdminScanner} />
                <Stack.Screen name="AdminProdutoEditor" component={AdminProdutoEditor} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Pagamento" component={RechargeScreen} />
                <Stack.Screen name="PixPayment" component={require('./screens/PixPaymentScreen').default} />
                <Stack.Screen name="CreditCardPayment" component={require('./screens/CreditCardPaymentScreen').default} />
                <Stack.Screen name="HistoricoScreen" component={HistoricoScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </CardapioProvider>
        </ThemeProvider>
      </CartProvider>
    </UserProvider>
  );
}
