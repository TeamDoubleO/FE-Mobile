import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ScrollView 스타일
  scrollView: { width: 340, marginVertical: 20, alignSelf: 'center' },
  // ScrollView 내부 전체 컨텐츠 박스 스타일
  contentContainer: {
    borderTopWidth: 1, // 리스트 최상단 구분선
    borderColor: '#B7B7B7',
  },
  // 각 아이템 박스 스타일
  itemBox: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#B7B7B7',
  },
  // 선택된 아이템 박스 스타일
  selectedItemBox: { backgroundColor: '#E7EDE8' },
  // 각 아이템 텍스트 스타일
  itemText: {
    fontSize: 20,
    color: '#000000',
  },
  // 선택된 아이템 텍스트 스타일
  selectedItemText: { color: '#19461A' },
});
