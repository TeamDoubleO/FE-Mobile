import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  shadowWrapper: {
    // 그림자 설정
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7, // Android용
    borderRadius: 15,
    width: '70%',
    height: '80%',
    marginVertical: '10%',
  },
  cardContainer: {
    flex: 1, // 부모(shadowWrapper)의 크기를 꽉 채워 카드와 그림자 모양을 일치시킴
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // 배경 이미지가 카드 안에 잘리게
    position: 'relative', // 자식의 absolute 포지션 기준점
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
    color: colors.black,
    textAlign: 'center',
    marginBottom: '5%',
  },
  cardSubText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.darkGray,
    textAlign: 'center',
  },
  qrTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: colors.black,
    marginBottom: '10%',
    zIndex: 1, // QR과 텍스트를 배경 위에
  },
  userName: {
    fontSize: 24,
    fontWeight: 600,
    color: colors.black,
    marginVertical: '8%',
  },
  hospital: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.darkGray,
    marginTop: '2%',
  },
});
