import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    marginBottom: 8,
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
    marginBottom: 0,
  },

  categoriaButton: {
    height: 32,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    width: '30%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },

  nome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 2,
  },

  preco: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },

  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },

  favButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  favAtivo: {
    backgroundColor: '#FACC15',
  },

  favText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },

  cartButton: {
    backgroundColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  cartText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },

  carrinhoButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 50,
    elevation: 5,
  },
});
