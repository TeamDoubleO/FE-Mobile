import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles/MyPage.styles';
import PasswordConfirmModal from '../modals/PasswordConfirmModal';
import WaveHeader from '../components/headers/WaveHeader';
import NormalInput from '../components/textinputs/NormalInput';
import GrayButton from '../components/buttons/GrayButton';
import { useNavigation } from '@react-navigation/native';
import NormalAlert from '../components/alerts/NormalAlert';
import { deleteUser, getMyInfo, logoutUser } from '../apis/MyPageApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyPage({ setIsLoggedIn }) {
  const [isVerified, setIsVerified] = useState(false); // 비밀번호 인증 여부
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Alert 관리 상태변수
  const [showUpdatePasswordConfirmAlert, setShowUpdatePasswordConfirmAlert] = useState(false);
  const [showUpdatePasswordSuccessAlert, setShowUpdatePasswordSuccessAlert] = useState(false);
  const [showDeleteUserConfirmAlert, setShowDeleteUserConfirmAlert] = useState(false);
  const [showDeleteUserSuccessAlert, setShowDeleteUserSuccessAlert] = useState(false);

  // 회원 정보 관리 상태변수
  const [userInfo, setUserInfo] = useState({
    name: '',
    birth: '',
    contact: '',
    email: '',
  });

  const [accessToken, setAccessToken] = useState(null); // 사용자 토큰

  const navigation = useNavigation();

  // 인증 완료 시, 모달 창 닫음
  const handleCloseModal = async () => {
    setIsModalVisible(false);
    setIsVerified(true);

    // 회원 정보 불러오기
    try {
      // 토큰 불러오기
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        throw new Error('토큰이 존재하지 않습니다.');
      }

      setAccessToken(token);

      const data = await getMyInfo(token);
      setUserInfo({
        name: data.name,
        birth: data.birthDate,
        contact: data.contact,
        email: data.email,
      });
    } catch (error) {
      console.log('내 정보 조회 실패:', error.response.data);
    }
  };

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = () => {
    setShowUpdatePasswordConfirmAlert(true);
  };

  // 로그아웃 확인 버튼 클릭 핸들러
  const handleLogoutConfirm = async () => {
    setShowUpdatePasswordConfirmAlert(false);
    setTimeout(() => {
      setShowUpdatePasswordSuccessAlert(true);
    }, 300);
  };

  // 로그아웃 성공 핸들러
  const handleLogoutSuccess = async () => {
    setShowUpdatePasswordSuccessAlert(false);

    // 로그아웃 처리
    try {
      if (!accessToken) {
        throw new Error('토큰이 존재하지 않습니다.');
      }

      await logoutUser(accessToken);

      // 토큰 삭제
      await AsyncStorage.removeItem('accessToken');

      // 시작 페이지로 이동되도록 로그인 상태 설정
      setIsLoggedIn(false);
    } catch (error) {
      console.log('내 정보 조회 실패:', error);
    }
  };

  // 회원 탈퇴 버튼 클릭 핸들러
  const handleDeleteUser = () => {
    setShowDeleteUserConfirmAlert(true);
  };

  // 회원 탈퇴 확인 버튼 클릭 핸들러
  const handleDeleteUserConfirm = async () => {
    setShowDeleteUserConfirmAlert(false);
    setTimeout(() => {
      setShowDeleteUserSuccessAlert(true);
    }, 300);
  };

  // 회원 탈퇴 성공 핸들러
  const handleDeleteUserSuccess = async () => {
    setShowDeleteUserSuccessAlert(false);

    // 회원 탈퇴 처리
    try {
      if (!accessToken) {
        throw new Error('토큰이 존재하지 않습니다.');
      }

      await deleteUser(accessToken);

      // 토큰 삭제
      await AsyncStorage.removeItem('accessToken');

      // 시작 페이지로 이동되도록 로그인 상태 설정
      setIsLoggedIn(false);
    } catch (error) {
      console.log('회원 탈퇴 실패:', error);
    }
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
            <NormalInput placeholder={`이름: ${userInfo.name}`} isEditable={false} />
            <NormalInput placeholder={`생년월일: ${userInfo.birth}`} isEditable={false} />
            <NormalInput placeholder={`전화번호: ${userInfo.contact}`} isEditable={false} />
            <NormalInput placeholder={`이메일: ${userInfo.email}`} isEditable={false} />
            <View style={styles.buttonContainer}>
              <GrayButton title="비밀번호 변경" onPressHandler={handlePassword} />
              <Text style={styles.buttonDivider}>|</Text>
              <GrayButton title="로그아웃" onPressHandler={handleLogout} />
              <Text style={styles.buttonDivider}>|</Text>
              <GrayButton title="회원 탈퇴" onPressHandler={handleDeleteUser} />
            </View>
          </View>
          <NormalAlert
            show={showUpdatePasswordConfirmAlert}
            title="로그아웃"
            message={`로그아웃 하시겠습니까?`}
            showCancel={true}
            onConfirmHandler={handleLogoutConfirm}
            onCancelHandler={() => setShowUpdatePasswordConfirmAlert(false)}
          />
          <NormalAlert
            show={showUpdatePasswordSuccessAlert}
            title="로그아웃 성공"
            message={`로그아웃이 완료되었습니다.\n시작 페이지로 이동합니다.`}
            onConfirmHandler={handleLogoutSuccess}
          />
          <NormalAlert
            show={showDeleteUserConfirmAlert}
            title="회월 탈퇴"
            message={`탈퇴 하시겠습니까?`}
            showCancel={true}
            onConfirmHandler={handleDeleteUserConfirm}
            onCancelHandler={() => setShowDeleteUserConfirmAlert(false)}
          />
          <NormalAlert
            show={showDeleteUserSuccessAlert}
            title="회원 탈퇴 성공"
            message={`회원 탈퇴가 완료되었습니다.\n언제든 다시 찾아주세요:)`}
            onConfirmHandler={handleDeleteUserSuccess}
          />
        </>
      )}

      <PasswordConfirmModal visible={isModalVisible} onCloseHandler={handleCloseModal} />
    </View>
  );
}
