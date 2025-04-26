import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: { alignItems: 'center' },
  container: {
    marginTop: '30%', // 헤더 사라진 길이 만큼 margin 지정
    paddingVertical: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTextImage: { width: '60%', height: '10%', marginBottom: '5%' },
  text: { fontSize: 20, color: '#7E7E7E' },
  logoIconImage: { width: '60%', height: '30%', marginVertical: '25%' },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '3%',
  },
});
