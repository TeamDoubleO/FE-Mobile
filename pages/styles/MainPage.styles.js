import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
  },
  logoImage: {
    width: 160,
    height: 60,
    marginTop: '15%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3%',
    gap: '5%',
  },
});
