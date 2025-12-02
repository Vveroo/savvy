import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCardapioContext } from '../contexts/CardapioContext';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../styles/colors';

export default function AdminProdutoEditor({ navigation }) {
  const { produtos, addProduto, editProduto, deleteProduto } = useCardapioContext();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('Lanches');
  const [categoriaModalVisible, setCategoriaModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const categorias = ['Lanches', 'Bebidas', 'Doces', 'Salgados', 'Acompanhamentos'];

  const handleNewProduct = () => {
    setEditingId(null);
    setNome('');
    setPreco('');
    setCategoria('Lanches');
    setModalVisible(true);
  };

  const handleEditProduct = (produto) => {
    setEditingId(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco.toString());
    setCategoria(produto.categoria);
    setModalVisible(true);
  };

  const handleSaveProduct = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Digite o nome do produto');
      return;
    }

    const precoNum = parseFloat(preco);
    if (isNaN(precoNum) || precoNum <= 0) {
      Alert.alert('Erro', 'Digite um preço válido');
      return;
    }

    const novoProduto = {
      id: editingId || Date.now().toString(),
      nome: nome.trim(),
      preco: precoNum,
      categoria,
    };

    if (editingId) {
      editProduto(editingId, novoProduto);
      Alert.alert('Sucesso', 'Produto atualizado!');
    } else {
      addProduto(novoProduto);
      Alert.alert('Sucesso', 'Produto adicionado!');
    }

    setModalVisible(false);
  };

  const handleDeleteProduct = (id) => {
    Alert.alert('Confirmar', 'Deseja deletar este produto?', [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Deletar',
        onPress: () => {
          deleteProduto(id);
          Alert.alert('Sucesso', 'Produto deletado!');
        },
      },
    ]);
  };

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderProduto = ({ item }) => (
    <View
      style={[
        styles.produtoItem,
        { borderColor: theme.divider, backgroundColor: theme.cardBackground },
      ]}
    >
      <View style={styles.produtoInfo}>
        <Text style={[styles.produtoNome, { color: theme.text }]}>{item.nome}</Text>
        <Text style={[styles.produtoCategoria, { color: theme.textMuted }]}>
          {item.categoria}
        </Text>
        <Text style={[styles.produtoPreco, { color: theme.button }]}>
          R$ {item.preco.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      <View style={styles.produtoActions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme.button }]}
          onPress={() => handleEditProduct(item)}
        >
          <Icon name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#e74c3c' }]}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Icon name="trash" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Editor de Produtos
        </Text>
        <TouchableOpacity onPress={handleNewProduct}>
          <Icon name="add-circle" size={28} color={theme.button} />
        </TouchableOpacity>
      </View>

      {/* Barra de busca */}
      <View style={[styles.searchBar, { backgroundColor: theme.cardBackground }]}>
        <Icon name="search" size={20} color={theme.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Buscar produtos..."
          placeholderTextColor={theme.textMuted}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="close" size={20} color={theme.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Lista de produtos */}
      {produtosFiltrados.length > 0 ? (
        <FlatList
          data={produtosFiltrados}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="alert-circle" size={48} color={theme.textMuted} />
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Nenhum produto encontrado
          </Text>
        </View>
      )}

      {/* Modal de edição/criação */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {editingId ? 'Editar Produto' : 'Novo Produto'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Nome */}
              <Text style={[styles.label, { color: theme.text }]}>Nome do Produto *</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.cardBackground,
                    color: theme.text,
                    borderColor: theme.divider,
                  },
                ]}
                placeholder="Ex: Hambúrguer"
                placeholderTextColor={theme.textMuted}
                value={nome}
                onChangeText={setNome}
              />

              {/* Preço */}
              <Text style={[styles.label, { color: theme.text }]}>Preço (R$) *</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.cardBackground,
                    color: theme.text,
                    borderColor: theme.divider,
                  },
                ]}
                placeholder="Ex: 25.50"
                placeholderTextColor={theme.textMuted}
                keyboardType="decimal-pad"
                value={preco}
                onChangeText={setPreco}
              />

              {/* Categoria */}
              <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.button,
                  },
                ]}
                onPress={() => setCategoriaModalVisible(true)}
              >
                <Text style={[styles.categoryButtonText, { color: theme.text }]}>
                  {categoria}
                </Text>
                <Icon name="chevron-down" size={20} color={theme.button} />
              </TouchableOpacity>

              {/* Categoria Modal */}
              <Modal visible={categoriaModalVisible} transparent>
                <View style={[styles.categoryModalOverlay]}>
                  <View
                    style={[
                      styles.categoryModal,
                      { backgroundColor: theme.background },
                    ]}
                  >
                    {categorias.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.categoryOption,
                          {
                            backgroundColor:
                              categoria === cat ? theme.button + '20' : 'transparent',
                            borderBottomColor: theme.divider,
                          },
                        ]}
                        onPress={() => {
                          setCategoria(cat);
                          setCategoriaModalVisible(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.categoryOptionText,
                            {
                              color: categoria === cat ? theme.button : theme.text,
                              fontWeight: categoria === cat ? 'bold' : 'normal',
                            },
                          ]}
                        >
                          {cat}
                        </Text>
                        {categoria === cat && (
                          <Icon name="checkmark" size={20} color={theme.button} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </Modal>
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.btnCancel, { borderColor: theme.textMuted }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.btnCancelText, { color: theme.text }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnSave, { backgroundColor: theme.button }]}
                onPress={handleSaveProduct}
              >
                <Text style={styles.btnSaveText}>
                  {editingId ? 'Atualizar' : 'Adicionar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  listContainer: {
    padding: 12,
  },
  produtoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  produtoCategoria: {
    fontSize: 12,
    marginBottom: 4,
  },
  produtoPreco: {
    fontSize: 14,
    fontWeight: '600',
  },
  produtoActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoryButtonText: {
    fontSize: 14,
  },
  categoryModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  categoryModal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: 300,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  categoryOptionText: {
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  btnCancel: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnCancelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  btnSave: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnSaveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
};
