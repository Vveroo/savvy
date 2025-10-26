import { COLORS } from './colors';
export const styles ={
  container: {
    flex: 1,
    backgroundColor: COLORS.telaCardapio,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: COLORS.item,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.shadowCardapio,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
  },
  preco: {
    fontSize: 16,
    color: COLORS.preco,
  },
  favButton: {
    marginTop: 6,
    padding: 6,
    borderRadius: 8,
    backgroundColor: COLORS.favButton,
  },
  favAtivo: {
    backgroundColor: COLORS.favAtivo,
  },
  favText: {
    fontSize: 14,
    color: COLORS.txt,
  },
};
