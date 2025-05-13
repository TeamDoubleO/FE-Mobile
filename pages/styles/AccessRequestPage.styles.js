import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingTop: '5%',
    gap: '3%',
  },
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '700',
    marginTop: '5%',
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.black,
  },
  infoText: {
    marginTop: '1%',
    fontSize: 20,
    textAlign: 'center',
    color: colors.darkGray,
  },
});
