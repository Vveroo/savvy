import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.telaCardapio,
    paddingHorizontal: 16,
    paddingTop: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.button,
    marginBottom: 16,
    textAlign: 'center',
  },

  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },

  listContent: {
    paddingBottom: 20,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  card: {
    backgroundColor: COLORS.item,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 12,
  },

  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 6,
    textAlign: 'center',
  },

  preco: {
    fontSize: 15,
    color: COLORS.preco,
    marginBottom: 12,
  },

  favButton: {
    backgroundColor: COLORS.favButton,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  favAtivo: {
    backgroundColor: COLORS.favAtivo,
  },

  favText: {
    fontSize: 13,
    color: COLORS.button,
    fontWeight: 'bold',
  },
});
