import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import GrayButton from '../components/common/buttons/GrayButton';
import { styles } from './styles/SignUpPage.styles';
import { useNavigation } from '@react-navigation/native';

const SignUpPage = () => {
  //상태 변수
  const [form, setForm] = useState({
    name: '', //이름
    rrn: '',  // 주민등록번호
    phone: '',  /// 전화번호
    id: '',  // 아이디
    pw: '',   // 비밀번호
    pwCheck: '',  // 비밀번호 확인
  });

  const [error,setError] = useState({}); // 에러 메시지

  //공통 핸들러 - 입력값 변경을 처리
  const handleInputChange = (field, value) => { // field : 바꿀 필드의 이름 (ex. name), value : 입력된 새로운 값
    setForm(prev => ({ ...prev, [field]: value }));  //입력값을 form state에 저장 (기존 form 객체 복사 후, 해당 필드만 새 값으로 덮어씀)
    if (error[field]) { //만약 error 메세지가 있다면
      setError(prev => ({ ...prev, [field]: undefined })); //경고 이후 입력하면 error 사라지도록 함
    }
  };

  //회원 가입 버튼 핸들러
  const handleSignUp = () => {
    let newError = {};
    if (!form.name) newError.name = '이름을 입력하세요';
    if (!form.rrn) newError.rrn = '주민등록번호를 입력하세요';
    if (!form.phone) newError.phone = '전화번호를 입력하세요';
    if (!form.id) newError.id = '아이디를 입력하세요';
    if (!form.pw) newError.pw = '비밀번호를 입력하세요';
    if (form.pw !== form.pwCheck) newError.pwCheck = '비밀번호가 다릅니다';
  
    setError(newError);
    if (Object.keys(newError).length > 0) return;
  
    // 실제 회원가입 처리 로직 추가 필요(ex: 서버 요청)

    // 성공 시 로그인 페이지로 이동
    navigation.navigate('LoginPage');
  };
  

  const navigation = useNavigation();

  const navigateToLogin = () => { //로그인 페이지로 이동하는 함수
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.center}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
      >
        <WaveHeader/>
        <Text style={styles.title}>회원가입</Text>
        <NormalInput
          placeholder="이름"
          errorText={error.name}
          isEditable={true}
          value={form.name}
          onChangeTextHandler={text => handleInputChange('name', text)}
        />
        <NormalInput
          placeholder="주민등록번호"
          errorText={error.rrn}
          isEditable={true}
          value={form.rrn}
          onChangeTextHandler={text => handleInputChange('rrn', text)}
        />
        <NormalInput
          placeholder="전화번호"
          errorText={error.phone}
          isEditable={true}
          value={form.phone}
          onChangeTextHandler={text => handleInputChange('phone', text)}
        />
        <NormalInput
          placeholder="아이디"
          errorText={error.id}
          isEditable={true}
          value={form.id}
          onChangeTextHandler={text => handleInputChange('id', text)}
        />
        <NormalInput
          placeholder="비밀번호"
          errorText={error.pw}
          isEditable={true}
          value={form.pw}
          onChangeTextHandler={text => handleInputChange('pw', text)}
          secureTextEntry={true}
        />
        <NormalInput
          placeholder="비밀번호 확인"
          errorText={error.pwCheck}
          isEditable={true}
          value={form.pwCheck}
          onChangeTextHandler={text => handleInputChange('pwCheck', text)}
          secureTextEntry={true}
        />
        <NormalButton title="회원가입" onPressHandler={handleSignUp} />
        <GrayButton title="로그인 하러 가기" onPressHandler={navigateToLogin} />
        <View style={styles.gongback}></View> 
      </ScrollView>
    </View>
  );
};

export default SignUpPage;
