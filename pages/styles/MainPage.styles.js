import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingTop: '5%',
  },
  logoImage: {
    width: 160,
    height: 60,
    marginTop: '15%',
    alignSelf: 'center',
  },
  cardContainer: {
    width: '100%',
    height: '55%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10%',
    overflow: 'hidden', // 배경 이미지가 카드 안에 잘리게
    position: 'relative', // 자식의 absolute 포지션 기준점
    // 그림자 설정
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 7, // Android용
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // 전체 카드 덮게 만듦
    width: '125%',
    zIndex: 0, // 맨 뒤로
    opacity: 0.5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#464646',
    textAlign: 'center',
    marginBottom: '5%',
  },
  cardSubText: {
    fontSize: 16,
    fontWeight: 500,
    color: '#7E7E7E',
    textAlign: 'center',
  },
  qrTitle: {
    fontSize: 26,
    fontWeight: 600,
    color: '#464646',
    marginBottom: '10%',
    zIndex: 1, // QR과 텍스트를 배경 위에
  },
  userName: {
    fontSize: 24,
    fontWeight: 600,
    color: '#464646',
    marginVertical: '8%',
  },
  hospital: {
    fontSize: 16,
    fontWeight: 500,
    color: '#7E7E7E',
    marginTop: '2%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3%',
    gap: '10%',
  },
});
