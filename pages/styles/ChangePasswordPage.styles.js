import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    alignItems: 'center',
  },
  title: {
    marginBottom: '5%',
    fontSize: 24,
    fontWeight: 700,
    color: colors.black,
  },
  text: {
    marginBottom: '10%',
    fontSize: 18,
    color: colors.darkGray,
  },
  textInput: { marginBottom: '10%' },
  button: { marginTop: '5%' },
});
