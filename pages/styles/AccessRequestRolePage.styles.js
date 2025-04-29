import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingTop: '5%',
  },
  scrollView: {
    paddingBottom: 50,
  },
  title: {
    color: '#464646',
    fontSize: 24,
    fontWeight: 600,
    margin: '5%',
    alignSelf: 'center',
  },
  // 구분선
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#464646',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
    gap: '10%',
  },
  // 환자/보호자 버튼 아래 정보
  contentContainer: {
    marginTop: '10%',
    gap: 20,
  },
  contentTitle: {
    color: '#464646',
    fontSize: 22,
    fontWeight: 500,
    marginTop: '5%',
  },
  inputWithButtonConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifyButton: {
    marginLeft: '3%',
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#24562B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 500,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 60,
  },
});
