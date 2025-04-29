import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';

export const styles = StyleSheet.create({
  // ScrollView 스타일
  scrollView: { padding: 16 },
  // ScrollView 내부 전체 컨텐츠 박스 스타일
  contentContainer: { paddingBottom: 60 },
  // 각 아이템 박스 스타일
  itemBox: {
    marginBottom: 10,
    marginBottom: -40,
  },
  // 각 아이템 텍스트 스타일
  itemText: {
    fontSize: 24,
    fontWeight: 900,
    color: colors.black,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  //   // 선택된 아이템 박스 스타일
  //   selectedItemBox: { backgroundColor: colors.lightGreen },
  // // 선택된 아이템 텍스트 스타일
  // selectedItemText: { color: colors.secondary },
});
