import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    marginTop: '10%',
    alignItems: 'center',
  },
  title: {
    marginBottom: '5%',
    fontSize: 24,
    fontWeight: 700,
    color: colors.black,
    textAlign: 'center',
  },
  text: {
    marginBottom: '10%',
    fontSize: 18,
    color: colors.darkGray,
    textAlign: 'center',
  },
  textInput: { marginBottom: '10%' },
  button: { marginTop: '5%' },
});
