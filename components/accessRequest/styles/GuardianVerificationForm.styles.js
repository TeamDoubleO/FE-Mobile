import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  // 환자/보호자 버튼 아래 정보
  container: {
    marginBottom: '5%',
    gap: 15,
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
});
