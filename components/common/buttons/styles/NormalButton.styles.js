import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // 긴 버튼 활성화 스타일 (기본 스타일)
  long: {
    minWidth: '80%',
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#24562B',
  },
  // 짧은 버튼 활성화 스타일
  short: {
    minWidth: '40%',
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#24562B',
  },
  // 버튼 비활성화 스타일
  disabled: {
    backgroundColor: '#B7B7B7',
  },
  // 버튼 텍스트 스타일
  text: { fontSize: 20, fontWeight: '500', color: '#ffffff' },
});
