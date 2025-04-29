import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';

export const styles = StyleSheet.create({
  // ScrollView 스타일
  scrollView: {
    minWidth: '80%',
    paddingBottom: 20,
  },
  // ScrollView 내부 전체 컨텐츠 박스 스타일
  contentContainer: {
    borderTopWidth: 1, // 리스트 최상단 구분선
    borderColor: colors.lightGray,
    paddingBottom: 60,
  },
  // 각 아이템 박스 스타일
  itemBox: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  // 각 아이템 텍스트 스타일
  itemText: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.black,
  },
  // // 선택된 아이템 박스 스타일
  // selectedItemBox: { backgroundColor: colors.lightGreen },
  // // 선택된 아이템 텍스트 스타일
  // selectedItemText: { color: colors.secondary },
});
