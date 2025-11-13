import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './auth/authContext'; 
import LoginScreen from './screens/LoginScreen';
import TabNavigator from './screens/TabNavigator';
import ForgotPasswordScreen from './screens/ForgotScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider> 
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
           
            <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
}
