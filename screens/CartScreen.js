import React, { useContext } from 'react';
import { 
  Alert,
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  useColorScheme // hook
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../contexts/CartContext';
import { getCartStyles } from '../styles/cartStyles';

export default function CartScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);

  
  //  Lógica do Tema
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = getCartStyles(isDarkMode);

  // recomendável tratar caso o item.price venha undefined para não quebrar
  const total = cart.reduce((sum, item) => {
    const precoNumerico = typeof item.preco === 'string' 
      ? parseFloat(item.preco) // Se for texto, converte
      : item.preco;            // Se já for número, mantém
      
    return sum + (precoNumerico || 0);
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* Ajustei a cor do ícone para acompanhar o tema */}
          <Icon name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={styles.title}>Carrinho</Text>
      </View>

      {/* Lista de itens */}
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        // Adicionei uma mensagem caso o carrinho esteja vazio
        ListEmptyComponent={<Text style={{color: '#999', textAlign: 'center'}}>Seu carrinho está vazio.</Text>}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.nome}:{'\n'} R$ {item.preco ? item.preco.toFixed(2) : '0.00'}
          <TouchableOpacity style={styles.modalCloseCart} onPress={() => clearCart() } >
          <Text style={{ fontSize: 18 }}>✖</Text>
          </TouchableOpacity>
          </Text>
        )}
      />

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Finalizar Pedido",
                                   "Você tem certeza disto?",
                                   [
                                      {text: "Cancelar", style: "cancel"},
                                      {
                                        text: "Pagar",
                                        onPress: () => {console.log("ola")},
                                      }
                                   ]
                                  )
                }>

        <Text style={styles.buttonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={clearCart}>
        <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#555' }]}>
            Limpar Carrinho
        </Text>
      </TouchableOpacity>
    </View>
  );
}
