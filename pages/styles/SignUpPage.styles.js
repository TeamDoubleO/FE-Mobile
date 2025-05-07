import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '5%',
  },
  scrollView: { alignItems: 'center' },
  textInput: { alignItems: 'center' },
  button: { marginTop: '5%' },
  gongback: { marginBottom: '30%' },
});
