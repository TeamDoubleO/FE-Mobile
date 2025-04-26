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
  const [name, setName] = useState(''); // 이름
  const [rrn, setRrn] = useState(''); // 주민등록번호
  const [phone, setPhone] = useState(''); // 전화번호
  const [id, setId] = useState('');  // 아이디
  const [pw, setPw] = useState(''); // 비밀번호
  const [pwCheck, setPwCheck] = useState(''); // 비밀번호 확인

  const [error,setError] = useState({}); // 에러 메시지


  //입력 변경 핸들러
  const handleNameChange = (text) => { 
    setName(text); //입력한 값을 state에 저장 (경고 이후 입력한 것이니)
    if (error.name) { // 만약 error 메세지가 있는 상태라면
      setError(prev => ({ ...prev, name: undefined })); //경고 이후 입력하면 error 사라지도록 함
    }
  };

  //입력 변경 핸들러
  const handleRrnChange = (text) => {
    setRrn(text);
    if (error.rrn) {
      setError(prev => ({ ...prev, rrn: undefined }));
    }
  };

  //입력 변경 핸들러
  const handlePhoneChange = (text) => {
    setPhone(text);
    if (error.phone) {
      setError(prev => ({ ...prev, phone: undefined }));
    }
  };

  const handleIdChange = (text) => {
    setId(text);
    if (error.id) {
      setError(prev => ({ ...prev, id: undefined }));
    }
  };

  const handlePwChange = (text) => {
    setPw(text);
    if (error.pw) {
      setError(prev => ({ ...prev, pw: undefined }));
    }
  };

  const handlePwCheckChange = (text) => {
    setPwCheck(text);
    if (error.pwCheck) {
      setError(prev => ({ ...prev, pwCheck: undefined }));
    }
  };

  //회원 가입 버튼 핸들러
  const handleSignUp = () => {
    let newError = {};
    if (!name) newError.name = '이름을 입력하세요';
    if (!rrn) newError.rrn = '주민등록번호를 입력하세요';
    if (!phone) newError.phone = '전화번호를 입력하세요';
    if (!id) newError.id = '아이디를 입력하세요';
    if (!pw) newError.pw = '비밀번호를 입력하세요';
    if (pw !== pwCheck) newError.pwCheck = '비밀번호가 다릅니다';
  
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
          value={name}
          onChangeTextHandler={handleNameChange}
        />
        <NormalInput
          placeholder="주민등록번호"
          errorText={error.rrn}
          isEditable={true}
          value={rrn}
          onChangeTextHandler={handleRrnChange}
        />
        <NormalInput
          placeholder="전화번호"
          errorText={error.phone}
          isEditable={true}
          value={phone}
          onChangeTextHandler={handlePhoneChange}
        />
        <NormalInput
          placeholder="아이디"
          errorText={error.id}
          isEditable={true}
          value={id}
          onChangeTextHandler={handleIdChange}
        />
        <NormalInput
          placeholder="비밀번호"
          errorText={error.pw}
          isEditable={true}
          value={pw}
          onChangeTextHandler={handlePwChange}
          secureTextEntry={true}
        />
        <NormalInput
          placeholder="비밀번호 확인"
          errorText={error.pwCheck}
          isEditable={true}
          value={pwCheck}
          onChangeTextHandler={handlePwCheckChange}
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
