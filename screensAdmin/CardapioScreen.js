import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { getCardapioStyles } from '../stylesAdmin/cardapioStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { useCardapioContext } from '../contexts/CardapioContext';
import { useFocusEffect } from '@react-navigation/native';

export default function CardapioAdminScreen({ navigation }) {
  const { produtos, addProduto, editProduto, deleteProduto, setProdutos } = useCardapioContext();
  const [busca, setBusca] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showNovaCategoria, setShowNovaCategoria] = useState(false);

  const { isDarkMode } = useTheme();
  const styles = getCardapioStyles(isDarkMode);

  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, [produtos])
  );

  const handleAddItem = () => {
    setSelectedItem({
      id: Date.now().toString(),
      nome: '',
      preco: 0,
      descricao: '',
      categoria: '',
    });
    setIsEditing(false);
    setModalVisible(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleSaveItem = () => {
    if (!selectedItem.nome || !selectedItem.categoria) {
      alert('Preencha nome e categoria');
      return;
    }

    if (isEditing) {
      editProduto(selectedItem.id, selectedItem);
    } else {
      addProduto(selectedItem);
    }
    setModalVisible(false);
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      'Deseja deletar este item?',
      '',
      [
        { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Deletar',
            style: 'destructive',
            onPress: () => {
              deleteProduto(id);
            },
          },
      ]
    );
  };

  const produtosFiltrados = Array.isArray(produtos)
    ? produtos.filter((item) =>
        item?.nome?.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin - Cardápio</Text>

      {/* Busca */}
      <View style={styles.searchWrapper}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar item..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* Lista de produtos */}
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.grid}>
          {produtosFiltrados.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: isDarkMode ? '#fff' : '#000' }}>
              Nenhum produto encontrado.
            </Text>
          ) : (
            produtosFiltrados.map((item) => (
              <View
                key={item.id}
                style={styles.card}
              >
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.preco}>
                  R$ {Number(item.preco).toFixed(2)}
                </Text>

                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                  {/* Botão de editar */}
                  <TouchableOpacity
                    style={[styles.addButton, { flex: 1 }]}
                    onPress={() => handleEditItem(item)}
                  >
                    <Text style={styles.addText}>Editar</Text>
                  </TouchableOpacity>

                  {/* Botão de excluir */}
                  <TouchableOpacity
                    style={[styles.deleteButton, { flex: 1 }]}
                    onPress={() => handleDeleteItem(item.id)}
                  >
                    <Icon name="trash-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      {/* Modal de adicionar/editar */}
      {selectedItem && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ fontSize: 18, color: isDarkMode ? '#fff' : '#000' }}>
                  ✖
                </Text>
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
                value={selectedItem.nome}
                onChangeText={(text) =>
                  setSelectedItem({ ...selectedItem, nome: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Preço"
                placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
                keyboardType="numeric"
                value={String(selectedItem.preco)}
                onChangeText={(text) =>
                  setSelectedItem({
                    ...selectedItem,
                    preco: parseFloat(text) || 0,
                  })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Descrição"
                placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
                value={selectedItem.descricao}
                onChangeText={(text) =>
                  setSelectedItem({ ...selectedItem, descricao: text })
                }
              />

              {/* Picker de categoria */}
              <Text style={styles.label}>Categoria</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedItem.categoria}
                  style={styles.picker}
                  onValueChange={(value) => {
                    if (value === 'nova') {
                      setSelectedItem({ ...selectedItem, categoria: '' });
                      setShowNovaCategoria(true);
                    } else {
                      setSelectedItem({ ...selectedItem, categoria: value });
                      setShowNovaCategoria(false);
                    }
                  }}
                >
                  <Picker.Item label="Selecione uma categoria" value="" />
                  <Picker.Item label="Lanches" value="Lanches" />
                  <Picker.Item label="Bebidas" value="Bebidas" />
                  <Picker.Item label="Doces" value="Doces" />
                  <Picker.Item label="+ Nova Categoria" value="nova" />
                </Picker>
              </View>

              {showNovaCategoria && (
                <TextInput
                  style={styles.input}
                  placeholder="Digite nova categoria"
                  placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
                  value={selectedItem.categoria}
                  onChangeText={(text) =>
                    setSelectedItem({ ...selectedItem, categoria: text })
                  }
                />
              )}

              <TouchableOpacity
                style={styles.cartButton}
                onPress={handleSaveItem}
              >
                <Text style={styles.cartText}>
                  {isEditing ? 'Salvar Alterações' : 'Adicionar Item'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* FAB - Floating Action Button para abrir editor completo */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#2196F3',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
        onPress={() => navigation.navigate('AdminProdutoEditor')}
      >
        <Icon name="create" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}