import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.black,
  },
  text: {
    fontSize: 19,
    color: colors.black,
  },
  validateText: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.tertiary,
  },
});
