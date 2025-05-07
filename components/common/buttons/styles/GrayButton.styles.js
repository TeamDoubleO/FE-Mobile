import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
    paddingVertical: 2,
    paddingTop: '5%',
    alignItems: 'right',
  },
  text: {
    color: colors.darkGray,
    fontSize: 16,
  },
});
