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
  // 환자/보호자 버튼 아래 정보
  contentContainer: {
    marginTop: '10%',
    gap: 20,
  },
  contentTitle: {
    color: colors.black,
    fontSize: 22,
    fontWeight: 600,
    marginTop: '5%',
  },
  inputWithButtonConatiner: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifyButton: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  verifyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 60,
  },
});
