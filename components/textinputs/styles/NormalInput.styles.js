import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  input: {
    minWidth: '80%',
    height: 50,
    marginVertical: '1.5%',
    paddingHorizontal: '5%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.lightGreen,
    fontSize: 17,
  },
  focused: { borderColor: colors.tertiary },
  error: { borderColor: colors.error },
  errorText: {
    marginLeft: '2%',
    marginTop: '1%',
    fontSize: 15,
    color: colors.error,
  },
  editable: {
    backgroundColor: colors.background,
    color: colors.darkGray,
  },
});
