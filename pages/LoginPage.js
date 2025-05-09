import { View, Text } from 'react-native';
import React, { useState } from 'react';
import WaveHeader from '../components/headers/WaveHeader';
import NormalInput from '../components/textinputs/NormalInput';
import NormalButton from '../components/buttons/NormalButton';
import { styles } from './styles/LoginPage.styles';
import GrayUnderlineButton from '../components/buttons/GrayButton';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NormalAlert from '../components/alerts/NormalAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../apis/LoginApi';
import LoadingOverlay from '../components/loadings/LoadingOverlay';

const LoginPage = ({ setIsLoggedIn }) => {
  //상태 변수
  const [form, setForm] = useState({
    email: '', // 이메일
    pw: '', // 비밀번호
  });

  // Alert 관리 상태변수
  const [showAlert, setShowAlert] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  //이메일 형식 검증 함수
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 비밀번호 규칙 검사 (8자 이상, 영문/숫자/특수문자 포함)
  const isValidPassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(pw);

  const [error, setError] = useState({}); // 에러 메시지
  const [isPwValid, setIsPwValid] = useState(false); //비밀번호 유효성
  const [loading, setLoading] = useState(false); // 토큰 확인 중 상태

  const handleInputChange = (field, value) => {
    // field : 바꿀 필드의 이름 (ex. name), value : 입력된 새로운 값
    setForm((prev) => ({ ...prev, [field]: value })); //입력값을 form state에 저장 (기존 form 객체 복사 후, 해당 필드만 새 값으로 덮어씀)

    if (field === 'pw') {
      //비밀번호 필드가 변경되면
      setIsPwValid(isValidPassword(value)); //비밀번호 유효성 확인
      setError((prev) => ({ ...prev, pw: undefined }));
    } else if (error[field]) {
      //만약 error 메세지가 있다면
      setError((prev) => ({ ...prev, [field]: undefined })); //경고 이후 입력하면 error 사라지도록 함
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    let newError = {};
    if (!form.email) newError.email = '이메일을 입력하세요';
    else if (!isValidEmail(form.email)) newError.email = '올바른 이메일 형식이 아닙니다';
    if (!form.pw) newError.pw = '비밀번호를 입력하세요';
    else if (!isValidPassword(form.pw))
      newError.pw = '비밀번호는 8자 이상, 영문/숫자/특수문자 포함!';

    setError(newError);

    //에러가 하나라도 있으면 함수 종료 => 로그인 진행 안함
    if (Object.keys(newError).length > 0) {
      setLoading(false);
      return;
    }

    try {
      //로그인 API 연결
      const data = await loginUser(form);
      if (data && data.data.accessToken) {
        //토큰 있어야만 저장하도록함
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        setShowAlert(true);
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setShowErrorAlert(true);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 로그인 성공 핸들러
  const handleSuccess = () => {
    setShowAlert(false);
    // 메인 페이지로 이동되도록 로그인 상태 설정
    setIsLoggedIn(true);
  };

  const navigation = useNavigation();

  const navigateToSignUp = () => {
    // 회원가입 페이지로 이동하는 함수
    navigation.navigate('SignUpVerificationPage');
  };

  return (
    <>
      <LoadingOverlay visible={loading} /*로딩*/ />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
        extraScrollHeight={30} // 키보드와 입력창 사이 간격
        enableOnAndroid={true} // 안드로이드 자동 스크롤 설정
      >
        <WaveHeader />
        <Text style={styles.title}>로그인</Text>
        <NormalInput
          placeholder="이메일"
          errorText={error.email}
          isEditable={true}
          value={form.email}
          onChangeTextHandler={(text) => handleInputChange('email', text)}
          inputWrpperWidth={{ width: '80%' }}
        />
        <NormalInput
          placeholder="비밀번호"
          errorText={
            error.pw ||
            (form.pw && !isPwValid ? '비밀번호는 8자 이상, 영문/숫자/특수문자 포함!' : '')
          }
          isEditable={true}
          value={form.pw}
          onChangeTextHandler={(text) => handleInputChange('pw', text)}
          isSecureTextEntry={true}
          inputWrpperWidth={{ width: '80%' }}
        />
        <NormalButton title="로그인" onPressHandler={handleLogin} style={styles.button} />
        <GrayUnderlineButton title="계정 만들기" onPressHandler={navigateToSignUp} />
        <View style={styles.gongback}></View>
      </KeyboardAwareScrollView>
      <NormalAlert
        show={showAlert}
        title="로그인 성공"
        message={`로그인에 성공하였습니다.\n메인 페이지로 이동합니다.`}
        onConfirmHandler={handleSuccess}
      />
      <NormalAlert
        show={showErrorAlert}
        title="로그인 실패"
        message={`로그인에 실패했습니다.\n다시 시도해주세요.`}
        onConfirmHandler={() => setShowErrorAlert(false)}
      />
    </>
  );
};

export default LoginPage;
