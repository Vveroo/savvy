import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { CartContext } from '../contexts/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Carrinho</Text>
      {cart.map((item, index) => (<Text key={index}>{item.name} - R$ {item.price}</Text>))}
      <Text>Total: R$ {total}</Text>
      <Button title="Finalizar Pedido" onPress={() => navigation.navigate('Pagamento', { total })} />
      <Button title="Limpar Carrinho" onPress={clearCart} />
    </View>
  );
}
