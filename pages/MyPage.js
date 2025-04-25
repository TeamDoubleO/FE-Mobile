import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { styles } from './styles/MyPage.styles';
import PasswordConfirmModal from '../modals/PasswordConfirmModal';
import WaveHeader from '../components/common/headers/WaveHeader';
import NormalInput from '../components/common/textinput/NormalInput';
import GrayButton from '../components/common/buttons/GrayButton';
import { useNavigation } from '@react-navigation/native';

export default function MyPage() {
  const [isVerified, setIsVerified] = useState(false); // 비밀번호 인증 여부
  const [isModalVisible, setIsModalVisible] = useState(true);

  const navigation = useNavigation();

  // 인증 완료 시, 모달 창 닫음
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsVerified(true);
  };

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '확인',
          onPress: () => {
            // TODO: 로그아웃 처리
          },
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  // 비밀번호 변경 버튼 클릭 핸들러
  const handlePassword = () => {
    navigation.navigate('ChangePasswordPage');
  };

  return (
    <View>
      <WaveHeader />
      {/* 비밀번호 인증 완료 시, 본문 보이도록 설정 */}
      {isVerified && (
        <View style={styles.container}>
          <Text style={styles.title}>마이 페이지</Text>
          <NormalInput placeholder="이름: 김짱구" isEditable={false} />
          <NormalInput placeholder="전화번호: 010-1234-1234" isEditable={false} />
          <NormalInput placeholder="생년월일: 2022-08-02" isEditable={false} />
          <NormalInput placeholder="아이디: zzzzzang_gu" isEditable={false} />
          <View style={styles.buttonContainer}>
            <GrayButton title="비밀번호 변경" onPressHandler={handlePassword} />
            <GrayButton title="로그아웃" onPressHandler={handleLogout} />
          </View>
        </View>
      )}

      <PasswordConfirmModal visible={isModalVisible} onCloseHandler={handleCloseModal} />
    </View>
  );
}
