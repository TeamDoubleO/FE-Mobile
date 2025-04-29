import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ScrollView 스타일
  scrollView: {
    padding: 16, 
  },
  // ScrollView 내부 전체 컨텐츠 박스 스타일
  contentContainer: {
    paddingBottom: 60
  },
  // 각 아이템 박스 스타일
  itemBox: {
    marginBottom: 10, marginBottom: -40
  },
  // 선택된 아이템 박스 스타일
  selectedItemBox: { backgroundColor: '#E7EDE8' },
  // 각 아이템 텍스트 스타일
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  // 선택된 아이템 텍스트 스타일
  selectedItemText: { color: '#19461A' },
});
