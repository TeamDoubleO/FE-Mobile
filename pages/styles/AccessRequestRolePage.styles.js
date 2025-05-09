import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingTop: '5%',
  },
  scrollView: { paddingBottom: 50 },
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: 600,
    margin: '5%',
    alignSelf: 'center',
  },
  // 구분선
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: colors.black,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
    gap: '10%',
  },
  contentContainer: {
    marginTop: '10%',
    gap: 15,
  },
  contentTitle: {
    color: colors.black,
    fontSize: 22,
    fontWeight: 600,
    marginTop: '5%',
  },
  submitButton: {
    marginTop: 15,
    marginBottom: 50,
  },
});
