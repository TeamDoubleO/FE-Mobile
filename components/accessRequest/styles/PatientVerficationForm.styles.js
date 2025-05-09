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
  verifyButton: {
    marginTop: 15,
    marginBottom: 50,
  },
});
