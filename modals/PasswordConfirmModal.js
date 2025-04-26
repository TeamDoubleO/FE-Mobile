import { View, Text, Modal, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/PasswordConfirmModal.styles';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import WaveHeader from '../components/common/headers/WaveHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PasswordConfirmModal = ({ visible = true, onCloseHandler }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    // 임시 검증 로직
    if (password === '1234') {
      setError('');
      onCloseHandler();
    } else {
      setPassword('');
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <Modal visible={visible} transparent={true}>
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
          {error === '' ? (
            <NormalInput
              placeholder="비밀번호 입력"
              value={password}
              onChangeTextHandler={setPassword}
              style={styles.textInput}
            />
          ) : (
            <NormalInput
              placeholder="비밀번호 입력"
              errorText={error}
              value={password}
              onChangeTextHandler={setPassword}
              style={styles.textInput}
            />
          )}

          <NormalButton title="확인" onPressHandler={handleConfirm} style={styles.button} />
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default PasswordConfirmModal;
