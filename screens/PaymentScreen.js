import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../contexts/CartContext';
import { getCartStyles } from '../styles/cartStyles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation();
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handlePayment = () => {
    setPaymentModalVisible(true);
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setPaymentModalVisible(false);
  };

  const handlePixPayment = () => {
    // Simulado de pagamento via PIX
    const randomCode = generateRandomCode();
    // Lógica para abrir o aplicativo de transferência PIX
    console.log('Código PIX:', randomCode);
  };

  const handleCreditCardPayment = () => {
    // Simulado de pagamento via cartão de crédito
    // Lógica para abrir a tela de adicionar cartão de crédito
    console.log('Pagar com cartão de crédito');
  };

  const generateRandomCode = () => {
    // Lógica para gerar um código aleatório de PIX
    return '1234567890';
  };

  return (
    <View style={getCartStyles.container}>
      <Text style={getCartStyles.title}>Meu carrinho</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.itemId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={getCartStyles.itemContainer}
            onPress={() => handleRemoveFromCart(item.itemId)}
          >
            <Text style={getCartStyles.itemText}>{item.name}</Text>
            <Text style={getCartStyles.itemText}>{item.price}</Text>
            <Icon name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={getCartStyles.button} onPress={handlePayment}>
        <Text style={getCartStyles.buttonText}>Finalizar pedido</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentModalVisible}
      >
        <View style={getCartStyles.paymentModal}>
          <Text style={getCartStyles.paymentModalTitle}>Escolha a forma de pagamento</Text>
          <Button
            title="PIX"
            onPress={() => handlePaymentMethod('PIX')}
          />
          <Button
            title="Cartão de Crédito"
            onPress={() => handlePaymentMethod('Cartão de Crédito')}
          />
          <Button
            title="Cancelar"
            onPress={() => setPaymentModalVisible(false)}
          />
        </View>
      </Modal>
      {paymentMethod === 'PIX' && (
        <View style={getCartStyles.paymentModal}>
          <Text style={getCartStyles.paymentModalTitle}>Pagamento via PIX</Text>
          <Text style={getCartStyles.paymentModalText}>Código PIX:</Text>
          <Text style={getCartStyles.paymentModalText}>{generateRandomCode()}</Text>
          <Button
            title="Pagar"
            onPress={handlePixPayment}
          />
        </View>
      )}
      {paymentMethod === 'Cartão de Crédito' && (
        <View style={getCartStyles.paymentModal}>
          <Text style={getCartStyles.paymentModalTitle}>Pagamento via Cartão de Crédito</Text>
          <Text style={getCartStyles.paymentModalText}>
            Adicione um novo cartão de crédito ou selecione um existente
          </Text>
          <Button
            title="Adicionar cartão de crédito"
            onPress={handleCreditCardPayment}
          />
        </View>
      )}
    </View>
  );
};

export default CartScreen;