import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import GrayButton from '../components/common/buttons/GrayButton';
import { styles } from './styles/SignUpPage.styles';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//더미데이터 (개인정보 인증용)
const dummyVerifyUser = [
  {
    name: '홍길동',
    rrn: '001',
    phone: '001',
  },
  {
    name: '홍길은',
    rrn: '002',
    phone: '002',
  },
];

const SignUpVerificationPage = () => {
  //상태 변수
  const [form, setForm] = useState({
    name: '', //이름
    rrn: '', // 주민등록번호
    phone: '', /// 전화번호
  });

  // 전화번호, 주민등록 번호 검사 추가 필요

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

  //인증 버튼 핸들러
  const handleVerification = () => {
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
      // 더미 데이터와 비교
      const isVerified = dummyVerifyUser.some(
        //.some()메서드로 배열에서 조건을 만족하는 요소가 하나라도 있으면 true를 반환
        //세 항목이 모두 일차하는 사용자가 있으면 true반환
        (user) => user.name === form.name && user.rrn === form.rrn && user.phone === form.phone,
      );
      if (isVerified) {
        // 성공 시 회원정보입력 페이지로, 데이터 함께 전달
        navigation.navigate('SignUpPage', {
          name: form.name,
          rrn: form.rrn,
          phone: form.phone,
        });
      } else {
        Alert.alert('인증 실패', '정보가 일치하지 않습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      //서버에서 내려주는 에러 메시지 처리
      console.error('개인정보 인증 실패:', error);
      //에러 처리 로직 추가 (ex. 에러 메시지 표시)
      /*
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('개인정보 인증에 실패했습니다. 다시 시도해주세요.');
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
      <NormalButton title="인증하기" onPressHandler={handleVerification} />
      <GrayButton title="로그인 하러 가기" onPressHandler={navigateToLogin} />
      <View style={styles.gongback}></View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpVerificationPage;
