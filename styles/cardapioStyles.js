import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 15,
    paddingTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#111827',
  },

  categoriasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    marginBottom: 12,
  },

  categoriaButton: {
    height: 36,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },

  categoriaAtiva: {
    backgroundColor: '#007AFF',
  },

  categoriaText: {
    fontSize: 14,
    color: '#333',
  },

  categoriaTextAtiva: {
    color: '#fff',
    fontWeight: '600',
  },

  grid: {
    flexDirection: 'column',
    alignItems: 'center',   // centraliza os cards
    paddingTop: 20,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',          // ocupa 100% da horizontal
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },

  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },

  preco: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },

  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },

  favButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  favAtivo: {
    backgroundColor: '#FACC15',
  },

  favText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },

  cartButton: {
    backgroundColor: '#10B981',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  cartText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },

  carrinhoButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 50,
    elevation: 5,
  },

  /** estilos para o modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    elevation: 6,
  },

  modalClose: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  modalNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    textAlign: 'center',
  },

  modalPreco: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 10,
  },

  modalDescricao: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
});
