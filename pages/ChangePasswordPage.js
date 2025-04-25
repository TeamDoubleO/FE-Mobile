import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/ChangePasswordPage.styles';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalButton from '../components/common/buttons/NormalButton';
import { useNavigation } from '@react-navigation/native';

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // 새 비밀번호 확인
  const [isAllowedForm, setIsAllowedForm] = useState(false); // 비밀번호 형식 검증 여부
  const [isVerified, setIsVerified] = useState(false); // 새 비밀번호 확인 인증 여부

  const navigation = useNavigation();

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
    if (!isVerified || newPassword === '') {
      Alert.alert('오류', '비밀번호를 올바르게 입력해주세요.');
      return;
    }

    Alert.alert('변경 완료', '비밀번호가 성공적으로 변경되었습니다.');

    // TODO: 메인 페이지로 이동되도록 설정
    navigation.navigate('');
  };

  return (
    <View>
      <WaveHeader />
      <View style={styles.container}>
        <Text style={styles.title}>비밀번호 변경</Text>
        <Text style={styles.text}>새로운 비밀번호를 입력해주세요.</Text>
        <NormalInput
          placeholder="새 비밀번호 (영문, 숫자, 특수문자 조합)"
          value={newPassword}
          onChangeTextHandler={handleNewPasswordChange}
        />
        <NormalInput
          placeholder="새 비밀번호 확인"
          value={confirmNewPassword}
          onChangeTextHandler={handleConfirmNewPassword}
          errorText={confirmNewPassword && !isVerified ? '비밀번호가 일치하지 않습니다' : ''}
        />
        <NormalButton title="변경" style={styles.button} onPressHandler={handlePressButton} />
      </View>
    </View>
  );
};

export default ChangePasswordPage;
