import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/ChangePasswordPage.styles';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NormalAlert from '../components/common/alerts/NormalAlert';

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // 새 비밀번호 확인
  const [isAllowedForm, setIsAllowedForm] = useState(false); // 비밀번호 형식 검증 여부
  const [isVerified, setIsVerified] = useState(false); // 새 비밀번호 확인 인증 여부
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 버튼 눌렀는지 여부

  // Alert 관리 상태변수
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const navigation = useNavigation();

  // 비밀번호 규칙 검사 핸들러 (8자 이상, 영문/숫자/특수문자 포함)
  const isValidPassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(pw);

  // 입력 변경 핸들러
  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
    // TODO: 비밀번호 형식 검증
  };

  // 비밀번호 확인 입력 변경 핸들러
  const handleConfirmNewPassword = (text) => {
    setConfirmNewPassword(text);
    setIsVerified(text === newPassword);
  };

  // 변경 버튼 클릭 핸들러
  const handlePressButton = () => {
    // 변경 버튼 클릭
    setIsSubmitted(true);

    // 비밀번호 변경이 불가능한 경우 return
    if (!newPassword || !isValidPassword(newPassword) || !isVerified) {
      return;
    }

    setShowConfirmAlert(true);
  };

  // 비밀번호 변경 확인 버튼 클릭 핸들러
  const handleConfirmChange = () => {
    setShowConfirmAlert(false);
    setShowSuccessAlert(true);
  };

  // 비밀번호 변경 성공 핸들러
  const handleSuccessConfirm = () => {
    setShowSuccessAlert(false);
    // 메인 페이지로 이동되도록 설정
    navigation.navigate('MainPage');
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
        extraScrollHeight={40} // 키보드와 입력창 사이 간격
        enableOnAndroid={true} // 안드로이드 자동 스크롤 설정
      >
        <WaveHeader />
        <View style={styles.container}>
          <Text style={styles.title}>비밀번호 변경</Text>
          <Text style={styles.text}>새로운 비밀번호를 입력해주세요.</Text>
          <NormalInput
            placeholder="새 비밀번호 (영문, 숫자, 특수문자 조합)"
            value={newPassword}
            onChangeTextHandler={handleNewPasswordChange}
            errorText={
              isSubmitted && (!newPassword || !isValidPassword(newPassword))
                ? '비밀번호를 입력하고 형식을 확인해주세요'
                : ''
            }
          />
          <NormalInput
            placeholder="새 비밀번호 확인"
            value={confirmNewPassword}
            onChangeTextHandler={handleConfirmNewPassword}
            errorText={
              isSubmitted && (!confirmNewPassword || !isVerified)
                ? '비밀번호가 일치하지 않습니다'
                : ''
            }
          />
          <NormalButton title="변경" style={styles.button} onPressHandler={handlePressButton} />
        </View>
      </KeyboardAwareScrollView>

      {/* 변경 확인 알림 */}
      <NormalAlert
        show={showConfirmAlert}
        title="비밀번호 변경"
        message="비밀번호를 변경하시겠습니까?"
        // 버튼 설정
        showCancel={true}
        // 동작 제어
        onConfirmHandler={handleConfirmChange}
        onCancelHandler={() => setShowConfirmAlert(false)}
      />

      {/* 성공 메시지 알림 */}
      <NormalAlert
        show={showSuccessAlert}
        title="비밀번호 변경 완료"
        message={`비밀번호가 변경되었습니다.\n로그인 페이지로 이동합니다.`}
        // 동작 제어
        onConfirmHandler={handleSuccessConfirm}
      />
    </>
  );
};

export default ChangePasswordPage;
