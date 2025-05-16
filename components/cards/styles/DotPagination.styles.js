import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
// TODO: 도트 상수 문서화 필요할지도.. 통일
export const DOT_SIZE = 12; // 도트 크기
export const DOT_MARGIN = 8; // 도트 사이 간격
export const MAX_DOTS = 8; // 한 그룹 최대 도트 수

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 16,
  },
  arrowContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  dotsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    minWidth: DOT_SIZE * MAX_DOTS + DOT_MARGIN * (MAX_DOTS - 1),
  },
});
