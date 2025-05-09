import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%', // 입력창 길이 부모에 맞춤
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    marginVertical: '1.5%',
    paddingLeft: '5%',
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
  eyeIcon: {
    position: 'absolute',
    padding: '5%',
    right: '1%',
  },
});
