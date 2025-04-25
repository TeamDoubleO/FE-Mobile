import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 150, // 헤더 사라진 길이 만큼 margin 지정
    marginLeft: 5,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTextImage: { width: 220, height: 60, marginLeft: 5, marginBottom: 20 },
  text: { fontSize: 20, color: '#7E7E7E', marginRight: 2 },
  logoIconImage: { width: 230, height: 200, marginLeft: 5, marginVertical: 80 },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 15,
  },
});
