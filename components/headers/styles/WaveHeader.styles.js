import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative', // 내용이 겹치지 않도록 설정
    width: '100%', // 헤더
    height: 240, // 헤더 높이
  },
  waveImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backButton: {
    marginTop: '20%',
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  logoImage: {
    width: 180, // 로고 너비
    height: 45, // 로고 높이
    marginTop: '-10%',
    alignSelf: 'center', // 가운데 정렬
    right: 3, //로고 오른쪽 여백
  },
});
