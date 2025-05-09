import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles/ChangePasswordPage.styles';
import WaveHeader from '../components/headers/WaveHeader';
import NormalInput from '../components/textinputs/NormalInput';
import NormalButton from '../components/buttons/NormalButton';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NormalAlert from '../components/alerts/NormalAlert';
import { updatePassword } from '../apis/PasswordApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordPage = () => {
  const [originalPassword, setOriginalPassword] = useState(''); // 기존 비밀번호
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // 새 비밀번호 확인
  const [isVerified, setIsVerified] = useState(false); // 새 비밀번호 확인 인증 여부
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 버튼 눌렀는지 여부

  // Alert 관리 상태변수
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');

  const navigation = useNavigation();

  // 비밀번호 규칙 검사 핸들러 (8자 이상, 영문/숫자/특수문자 포함)
  const isValidPassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(pw);

  useEffect(() => {
    setIsVerified(confirmNewPassword === newPassword);
  }, [confirmNewPassword, newPassword]);

  // 변경 버튼 클릭 핸들러
  const handlePressButton = () => {
    setIsSubmitted(true);

    // 비밀번호 변경이 불가능한 경우 return
    if (!newPassword || !isValidPassword(newPassword) || !isVerified) {
      return;
    }

    setShowConfirmAlert(true);
  };

  // 비밀번호 변경 확인 버튼 클릭 핸들러
  const handleConfirmChange = async () => {
    setShowConfirmAlert(false);
    try {
      // 토큰 불러오기
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        throw new Error('토큰이 존재하지 않습니다.');
      }

      await updatePassword(token, { originalPassword, newPassword });

      setTimeout(() => {
        setShowSuccessAlert(true);
      }, 300);
    } catch (error) {
      const status = error.response.data.status;
      let message = '비밀번호 변경에 실패했습니다.';

      if (status === 400) {
        message = '기존 비밀번호를 다시 입력해주세요.';
      } else if (status === 409) {
        message = `기존과 동일한 비밀번호는\n사용하실 수 없습니다.`;
      }

      setErrorAlertMessage(message);
      setShowErrorAlert(true);
    }
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
            placeholder="기존 비밀번호"
            value={originalPassword}
            onChangeTextHandler={setOriginalPassword}
            errorText={
              isSubmitted && (!originalPassword || !isValidPassword(originalPassword))
                ? '기존 비밀번호를 입력하고 형식을 확인해주세요'
                : ''
            }
            isSecureTextEntry={true}
            inputWrpperWidth={{ width: '80%' }}
          />
          <NormalInput
            placeholder="새 비밀번호 (영문, 숫자, 특수문자 조합)"
            value={newPassword}
            onChangeTextHandler={setNewPassword}
            errorText={
              isSubmitted && (!newPassword || !isValidPassword(newPassword))
                ? '새 비밀번호를 입력하고 형식을 확인해주세요'
                : ''
            }
            isSecureTextEntry={true}
            inputWrpperWidth={{ width: '80%' }}
          />
          <NormalInput
            placeholder="새 비밀번호 확인"
            value={confirmNewPassword}
            onChangeTextHandler={setConfirmNewPassword}
            errorText={
              isSubmitted && (!confirmNewPassword || !isVerified)
                ? '비밀번호가 일치하지 않습니다'
                : ''
            }
            isSecureTextEntry={true}
            inputWrpperWidth={{ width: '80%' }}
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
        message={`비밀번호가 변경되었습니다.\n메인 페이지로 이동합니다.`}
        // 동작 제어
        onConfirmHandler={handleSuccessConfirm}
      />

      <NormalAlert
        show={showErrorAlert}
        title="비밀번호 변경 실패"
        message={errorAlertMessage}
        onConfirmHandler={() => setShowErrorAlert(false)}
      />
    </>
  );
};

export default ChangePasswordPage;
