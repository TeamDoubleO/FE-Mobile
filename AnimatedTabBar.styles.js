import { StyleSheet } from 'react-native';
import { colors } from './constants/colors';

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 80, // 하단 탭 높이
    backgroundColor: colors.white, // 하단 탭 배경색
    // 테두리 반경
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // 그림자 효과
    shadowColor: colors.black,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    backgroundColor: colors.white,
    padding: 3,
    borderRadius: 16,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: colors.white,
    padding: 3,
    borderRadius: 8,
  },
  icon: {
    color: colors.lightGray,
  },
  iconActive: {
    color: colors.primary,
  },
  label: {
    fontSize: 13,
    color: colors.lightGray,
    fontWeight: 'bold',
    marginTop: 2,
  },
  labelActive: {
    color: colors.darkGray,
    fontWeight: 'bold',
  },
});
