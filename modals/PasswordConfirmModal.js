import { View, Text, Modal } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/PasswordConfirmModal.styles';
import NormalInput from '../components/textinputs/NormalInput';
import NormalButton from '../components/buttons/NormalButton';
import WaveHeader from '../components/headers/WaveHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { verifyPassword } from '../apis/PasswordApi';

const PasswordConfirmModal = ({ visible = true, onCloseHandler }) => {
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(''); // NormalText ErrorText

  // 비밀번호 규칙 검사 핸들러 (8자 이상, 영문/숫자/특수문자 포함)
  const isValidPassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(pw);

  // 비밀번호 입력 시 형식 검증
  const handlePasswordChange = (text) => {
    setPassword(text);

    if (!isValidPassword(text)) {
      setErrorText('8자 이상, 영문/숫자/특수문자를 포함해야 합니다.');
    } else {
      setErrorText('');
    }
  };

  const handleConfirm = async () => {
    if (!isValidPassword(password)) {
      setErrorText('8자 이상, 영문/숫자/특수문자를 포함해야 합니다.');
      return;
    }

    try {
      await verifyPassword(password);

      // 모달창 닫기
      onCloseHandler();
    } catch (error) {
      console.log(error);
      setErrorText('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
    }
  };
  // 모달 오류시 임시 코드
  // const handleConfirm = async () => {
  //   if (!isValidPassword(password)) {
  //     setErrorText('8자 이상, 영문/숫자/특수문자를 포함해야 합니다.');
  //     return;
  //   }

  //   // 임시: 비밀번호가 'Lgcns01!'이면 성공, 아니면 실패
  //   if (password === 'Lgcns01!') {
  //     onCloseHandler(); // 성공 시 모달 닫기
  //   } else {
  //     setErrorText('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
  //   }
  // };

  return (
    <Modal visible={visible}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
        extraScrollHeight={40} // 키보드와 입력창 사이 간격
        enableOnAndroid={true} // 안드로이드 자동 스크롤 설정
      >
        <WaveHeader />
        <View style={styles.container}>
          <Text style={styles.title}>비밀번호 확인</Text>
          <Text style={styles.text}>개인정보 보호를 위해 비밀번호를 확인합니다.</Text>
          <NormalInput
            placeholder="비밀번호 입력"
            value={password}
            onChangeTextHandler={handlePasswordChange}
            errorText={errorText}
            style={styles.textInput}
            isSecureTextEntry={true}
            inputWrpperWidth={{ width: '80%' }}
          />
          <NormalButton title="확인" onPressHandler={handleConfirm} style={styles.button} />
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default PasswordConfirmModal;
