import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.telaCardapio,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.button,
    marginBottom: 20,
    textAlign: 'center',
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
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '48%',
    shadowColor: COLORS.shadowCardapio,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 4,
    textAlign: 'center',
  },

  preco: {
    fontSize: 14,
    color: COLORS.preco,
    marginBottom: 10,
  },

  favButton: {
    backgroundColor: COLORS.favButton,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  favAtivo: {
    backgroundColor: COLORS.favAtivo,
  },

  favText: {
    fontSize: 12,
    color: COLORS.button,
    fontWeight: 'bold',
  },
});
