import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function MenuManagementScreen() {
  const [menu, setMenu] = useState([{ id: '1', name: 'Coxinha', price: 5 }]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    setMenu([...menu, { id: Date.now().toString(), name, price: parseFloat(price) }]);
    setName('');
    setPrice('');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Gerenciar Cardápio</Text>
      <TextInput placeholder="Nome do item" value={name} onChangeText={setName} style={{ borderWidth: 1, marginVertical: 10 }} />
      <TextInput placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" style={{ borderWidth: 1, marginVertical: 10 }} />
      <Button title="Adicionar Item" onPress={addItem} />
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (<Text>{item.name} - R$ {item.price}</Text>)}
      />
    </View>
  );
}
