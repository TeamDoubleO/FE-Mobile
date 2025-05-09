import { View, Text } from 'react-native';
import React, { useState } from 'react';
import WaveHeader from '../components/headers/WaveHeader';
import NormalInput from '../components/textinputs/NormalInput';
import NormalButton from '../components/buttons/NormalButton';
import GrayButton from '../components/buttons/GrayButton';
import { styles } from './styles/SignUpPage.styles';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { dummyVerifyUser } from '../mocks/dummyVerifyUser';
import NormalAlert from '../components/alerts/NormalAlert';

//전화번호 포맷 함수 (하이픈 자동 삽입)
const formatPhoneNumber = (value) => {
  // 숫자만 남김
  const onlyNums = value.replace(/[^0-9]/g, '');

  if (onlyNums.length < 4) return onlyNums;
  if (onlyNums.length < 8) return onlyNums.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  return onlyNums.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
};

//주민등록번호 포맷 함수 (앞6자리-뒤7자리)
const formatRRN = (value) => {
  const onlyNums = value.replace(/[^0-9]/g, '');

  if (onlyNums.length < 7) return onlyNums.replace(/(\d{0,6})/, '$1');
  return onlyNums.replace(/(\d{6})(\d{1,7})/, '$1-$2');
};

//주민등록번호 뒷자리 첫글자 이후 마스킹으로 바꿔보이는 함수
const maskRRN = (rrn) => {
  // rrn: '123456-1234567'
  if (!rrn) return '';
  const [front, back] = rrn.split('-');
  if (!front) return '';
  if (!back) return rrn;

  // 앞자리 + 하이픈 + 뒷자리 첫글자 + 마스킹
  const maskedBack = back[0] + '•'.repeat(Math.max(0, back.length - 1));
  return `${front}-${maskedBack}`;
};

const SignUpVerificationPage = () => {
  //상태 변수
  const [form, setForm] = useState({
    name: '', //이름
    rrn: '', // 주민등록번호
    phone: '', /// 전화번호
  });

  const [isRRNFocused, setIsRRNFocused] = useState(false); //주민등록번호 포커스 여부
  const [error, setError] = useState({}); // 에러 메시지

  // Alert 관리 상태변수
  const [showFailAlert, setShowFailAlert] = useState(false);

  //공통 핸들러 - 입력값 변경을 처리
  const handleInputChange = (field, value) => {
    // field : 바꿀 필드의 이름 (ex. name), value : 입력된 새로운 값
    let formattedValue = value;
    if (field === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }
    if (field === 'rrn') {
      formattedValue = formatRRN(value);
    }

    setForm((prev) => ({ ...prev, [field]: formattedValue })); //입력값을 form state에 저장 (기존 form 객체 복사 후, 해당 필드만 새 값으로 덮어씀)

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
      // const isVerified = dummyVerifyUser.some(
      //   //.some()메서드로 배열에서 조건을 만족하는 요소가 하나라도 있으면 true를 반환
      //   //세 항목이 모두 일차하는 사용자가 있으면 true반환
      //   (user) => user.name === form.name && user.rrn === form.rrn && user.phone === form.phone,
      // );
      const isVerified = true;
      if (isVerified) {
        // 성공 시 회원정보입력 페이지로, 데이터 함께 전달
        navigation.navigate('SignUpPage', {
          name: form.name,
          rrn: form.rrn,
          phone: form.phone,
        });
      } else {
        // alert 띄우도록 상태변수 변경
        setShowFailAlert(true);
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
    <>
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
          inputWrpperWidth={{ width: '80%' }}
        />
        <NormalInput
          placeholder="주민등록번호"
          errorText={error.rrn}
          isEditable={true}
          value={isRRNFocused ? form.rrn : maskRRN(form.rrn)} //포커스시 전체 다 보임
          onChangeTextHandler={(text) => handleInputChange('rrn', text)}
          onFocusHandler={() => setIsRRNFocused(true)}
          onBlurHandler={() => setIsRRNFocused(false)}
          maxLengthNum={14}
          inputWrpperWidth={{ width: '80%' }}
        />
        <NormalInput
          placeholder="전화번호"
          errorText={error.phone}
          isEditable={true}
          value={form.phone}
          onChangeTextHandler={(text) => handleInputChange('phone', text)}
          maxLengthNum={13}
          inputWrpperWidth={{ width: '80%' }}
        />
        <NormalButton title="인증하기" onPressHandler={handleVerification} />
        <GrayButton title="로그인 하러 가기" onPressHandler={navigateToLogin} />
        <View style={styles.gongback}></View>
      </KeyboardAwareScrollView>

      <NormalAlert
        show={showFailAlert}
        title="인증 실패"
        message={`정보가 일치하지 않습니다.\n다시 시도해주세요`}
        confirmText="다시 입력"
        onConfirmHandler={() => setShowFailAlert(false)}
      />
    </>
  );
};

export default SignUpVerificationPage;
