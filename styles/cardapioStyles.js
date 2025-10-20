import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f0f',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 16,
    color: COLORS.preco,
  },
  favButton: {
    backgroundColor: COLORS.buttonFav,
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  favActive: {
    backgroundColor: COLORS.buttonFavAtive,
  },
  favText: {
    fontSize: 14,
  },
});
