
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal
} from "react-native";
import styles from "../styles/paymentStyles";
import Clipboard from "@react-native-clipboard/clipboard";

export default function RecargaScreen() {
  const [valor, setValor] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [resumoVisible, setResumoVisible] = useState(false);
  const [pixVisible, setPixVisible] = useState(false);

  const confirmarRecarga = () => {
    const valorNumerico = Number(valor);

    if (!valor || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Erro", "Por favor, insira um valor válido.");
      return;
    }

    // Remove Alert para abrir modal diretamente
    setModalVisible(true);
  };

  const escolherPix = () => {
    setModalVisible(false);
    setResumoVisible(true);
  };

  const confirmarResumo = () => {
    setResumoVisible(false);
    setPixVisible(true);
    setSaldo(saldo + Number(valor)); // atualiza saldo
    setValor(""); // limpa campo
  };

  const codigoPix =
    "00020126580014BR.GOV.BCB.PIX0136+5547999999995204000053039865406100.005802BR5920Recarga Simulada6009Palhoca62070503***6304ABCD";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recarregar</Text>
      <Text style={styles.label}>Insira o valor que deseja recarregar:</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.saldoAtual}>Saldo atual: R$ {saldo}</Text>

        <View style={styles.adicionar}>
          <Text style={styles.valor}>Valor da recarga:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o valor"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />
        </View>
      </View>

      <TouchableOpacity onPress={confirmarRecarga}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Confirmar Recarga</Text>
        </View>
      </TouchableOpacity>

      {/* Modal de forma de pagamento */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Escolha a forma de pagamento</Text>
            <TouchableOpacity onPress={escolherPix} style={styles.button}>
              <Text style={styles.buttonText}>PIX</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Adicionar novo cartão</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Resumo do pedido */}
      <Modal visible={resumoVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Resumo do Pedido</Text>
            <Text>Valor: R$ {valor}</Text>
            <Text>Forma de pagamento: PIX</Text>
            <TouchableOpacity onPress={confirmarResumo} style={styles.button}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tela com código PIX */}
      <Modal visible={pixVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Código PIX</Text>
            <Text selectable>{codigoPix}</Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(codigoPix);
                Alert.alert(
                  "Copiado!",
                  "Código PIX copiado para área de transferência."
                );
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Copiar Código</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPixVisible(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
