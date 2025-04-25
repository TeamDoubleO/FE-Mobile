import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
homeButton: {
  position: 'absolute',
  top: 80, // 상단 여백
  right: -50, // 오른쪽 여백
  width: 100, // 버튼 너비
  height: 48, // 버튼 높이
  backgroundColor: '#fff',
  borderTopLeftRadius: 24, // 버튼 상단 왼쪽 모서리 둥글게
  borderBottomLeftRadius: 24, // 버튼 하단 왼쪽 모서리 둥글게
  justifyContent: 'center', // 버튼 내용 중앙 정렬

  // 그림자 (iOS)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 4,

  // 그림자 (Android)
  elevation: 6,
},
icon: {
  fontSize: 24,
  paddingLeft: 10,
},
});





