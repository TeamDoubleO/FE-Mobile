import { View, Text } from 'react-native';
import React, { useState } from 'react';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import GrayButton from '../components/common/buttons/GrayButton';
import { styles } from './styles/SignUpPage.styles';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpVerificationPage = () => {
  //상태 변수
  const [form, setForm] = useState({
    name: '', //이름
    rrn: '', // 주민등록번호
    phone: '', /// 전화번호
  });

  // 전화번호, 주민들록 번호 검사 추가 필요

  const [error, setError] = useState({}); // 에러 메시지

  //공통 핸들러 - 입력값 변경을 처리
  const handleInputChange = (field, value) => {
    // field : 바꿀 필드의 이름 (ex. name), value : 입력된 새로운 값
    setForm((prev) => ({ ...prev, [field]: value })); //입력값을 form state에 저장 (기존 form 객체 복사 후, 해당 필드만 새 값으로 덮어씀)

    if (error[field]) {
      //만약 error 메세지가 있다면
      setError((prev) => ({ ...prev, [field]: undefined })); //경고 이후 입력하면 error 사라지도록 함
    }
  };

  //회원 가입 버튼 핸들러
  const handleSignUp = () => {
    let newError = {};
    if (!form.name) newError.name = '이름을 입력하세요';
    if (!form.rrn) newError.rrn = '주민등록번호를 입력하세요';
    if (!form.phone) newError.phone = '전화번호를 입력하세요';

    setError(newError);
    if (Object.keys(newError).length > 0) return; //에러가 하나라도 있으면 함수 종료 => 회원가입 진행 안함

    try {
      // 개인정보 인증 처리 로직 추가
      // 개인정보 인증 API 요청 (axios 사용 예시)
      /*
      const response = await axios.post('https://your-api-url.com/??', {
        name: form.name,
        rrn: form.rrn,
        phone: form.phone,
        // 필요하다면 추가 필드도 전송
      });
      */
      navigation.navigate('SignUpPage');
    } catch (error) {
      //서버에서 내려주는 에러 메시지 처리
      console.error('개인정보 인증 실패:', error);
      //에러 처리 로직 추가 (ex. 에러 메시지 표시)
      /*
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
      */
    }
  };

  const navigation = useNavigation();

  const navigateToLogin = () => {
    //로그인 페이지로 이동하는 함수
    navigation.navigate('LoginPage');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
      extraScrollHeight={70} // 키보드와 입력창 사이 간격
      enableOnAndroid={true} // 안드로이드 자동 스크롤 설정
    >
      <WaveHeader />
      <View style={styles.padding}>
        <Text style={styles.title}>회원가입</Text>
      </View>
      <NormalInput
        placeholder="이름"
        errorText={error.name}
        isEditable={true}
        value={form.name}
        onChangeTextHandler={(text) => handleInputChange('name', text)}
      />
      <NormalInput
        placeholder="주민등록번호"
        errorText={error.rrn}
        isEditable={true}
        value={form.rrn}
        onChangeTextHandler={(text) => handleInputChange('rrn', text)}
      />
      <NormalInput
        placeholder="전화번호"
        errorText={error.phone}
        isEditable={true}
        value={form.phone}
        onChangeTextHandler={(text) => handleInputChange('phone', text)}
      />
      <NormalButton title="인증하기" onPressHandler={handleSignUp} />
      <GrayButton title="로그인 하러 가기" onPressHandler={navigateToLogin} />
      <View style={styles.gongback}></View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpVerificationPage;
