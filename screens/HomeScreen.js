// screens/HomeScreen.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/homeStyles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text styles={styles.titulo}>Seja Bem-Vindo(a) ao nosso App.</Text>

      {/* Os nomes das rotas devem corresponder aos 'name' no TabNavigator.js */}
      
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cardapio')}>
        <Text style={styles.txtBotao}>🍔 Cardápio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Favoritos')}>
        <Text style={styles.txtBotao}>⭐ Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Historico')}>
        <Text style={styles.txtBotao}>🕒 Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}