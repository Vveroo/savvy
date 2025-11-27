import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { getCardapioStyles } from '../stylesAdmin/cardapioStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { produtos as initialProdutos } from '../utils/mockData';
import { Picker } from '@react-native-picker/picker';

export default function CardapioAdminScreen() {
  const [produtos, setProdutos] = useState(initialProdutos);
  const [busca, setBusca] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showNovaCategoria, setShowNovaCategoria] = useState(false);

  const { isDarkMode } = useTheme();
  const styles = getCardapioStyles(isDarkMode);

  // Adicionar novo item
  const handleAddItem = () => {
    setSelectedItem({ id: Date.now(), nome: '', preco: '', descricao: '', categoria: '' });
    setIsEditing(false);
    setModalVisible(true);
  };

  // Editar item existente
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setModalVisible(true);
  };

  // Salvar item (novo ou editado)
  const handleSaveItem = () => {
    if (isEditing) {
      setProdutos((prev) =>
        prev.map((p) => (p.id === selectedItem.id ? selectedItem : p))
      );
    } else {
      setProdutos((prev) => [...prev, selectedItem]);
    }
    setModalVisible(false);
  };

  // Excluir item
  const handleDeleteItem = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const produtosFiltrados = produtos.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

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
          {produtosFiltrados.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleEditItem(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

              {/* Botão de excluir */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(item.id)}
              >
                <Icon name="trash-outline" size={20} color="#fff" />
              </TouchableOpacity>

              {/* Botão de editar */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleEditItem(item)}
              >
                <Text style={styles.addText}>Editar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botão global de adicionar novo item */}
      <TouchableOpacity
        style={styles.carrinhoButton}
        onPress={handleAddItem}
      >
        <Icon name="add-outline" size={28} color="#fff" />
      </TouchableOpacity>

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
                <Text style={{ fontSize: 18, color: isDarkMode ? '#fff' : '#000' }}>✖</Text>
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
                  setSelectedItem({ ...selectedItem, preco: parseFloat(text) || 0 })
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
                    if (value === "nova") {
                      setSelectedItem({ ...selectedItem, categoria: "" });
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
    </View>
  );
}
