import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: '5%',
    marginTop: '5%',
    alignContent: 'center',
  },
  buttonDivider: {
    paddingVertical: 2,
    paddingTop: '5%',
    color: colors.darkGray,
    fontSize: 16,
  },
  title: {
    marginBottom: '10%',
    fontSize: 24,
    fontWeight: 700,
    color: colors.black,
  },
});
