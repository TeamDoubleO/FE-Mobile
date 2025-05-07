import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles/MyPage.styles';
import PasswordConfirmModal from '../modals/PasswordConfirmModal';
import WaveHeader from '../components/headers/WaveHeader';
import NormalInput from '../components/textinputs/NormalInput';
import GrayButton from '../components/buttons/GrayButton';
import { useNavigation } from '@react-navigation/native';
import NormalAlert from '../components/alerts/NormalAlert';

export default function MyPage({ setIsLoggedIn }) {
  const [isVerified, setIsVerified] = useState(false); // 비밀번호 인증 여부
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Alert 관리 상태변수
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const navigation = useNavigation();

  // 인증 완료 시, 모달 창 닫음
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsVerified(true);
  };

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = () => {
    setShowConfirmAlert(true);
  };

  // 로그아웃 확인 버튼 클릭 핸들러
  const handleConfirm = () => {
    setShowConfirmAlert(false);
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(true);
    }, 300);
  };

  // 로그아웃 성공 핸들러
  const handleSuccessConfirm = () => {
    setShowSuccessAlert(false);

    // 시작 페이지로 이동되도록 로그인 상태 설정
    setIsLoggedIn(false);
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
        <>
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
          <NormalAlert
            show={showConfirmAlert}
            title="로그아웃"
            message={`로그아웃 하시겠습니까?`}
            showCancel={true}
            onConfirmHandler={handleConfirm}
            onCancelHandler={() => setShowConfirmAlert(false)}
          />
          <NormalAlert
            show={showSuccessAlert}
            title="로그아웃 성공"
            message={`로그아웃이 완료되었습니다.\n시작 페이지로 이동합니다.`}
            onConfirmHandler={handleSuccessConfirm}
          />
        </>
      )}

      <PasswordConfirmModal visible={isModalVisible} onCloseHandler={handleCloseModal} />
    </View>
  );
}
