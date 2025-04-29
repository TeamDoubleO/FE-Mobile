import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingTop: '5%',
    backgroundColor: colors.white,
    gap: '3%',
  },
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '700',
    marginTop: '5%',
    alignSelf: 'center',
  },
});
