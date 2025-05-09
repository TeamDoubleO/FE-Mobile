import { View, Text } from 'react-native';
import { styles } from './styles/PatientVerficationForm.styles';
import NormalButton from '../buttons/NormalButton';
import { useState, useEffect } from 'react';
import NormalInput from '../textinputs/NormalInput';
import NormalAlert from '../alerts/NormalAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyInfo } from '../../apis/MyPageApi';

const PatientVerficationForm = ({ onVerifiedHandler }) => {
  const [userInfo, setUserInfo] = useState({ name: '', birth: '', contact: '' }); // 회원 정보 관리
  const [isVerified, setIsVerified] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Alert 관리 상태변수
  const [showVerifyAlert, setShowVerifiedAlert] = useState(false);

  // 사용자 정보 불러오기
  useEffect(() => {
    const loadInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) throw new Error('토큰이 존재하지 않습니다.');

        const data = await getMyInfo(token);
        setUserInfo({
          name: data.name,
          birth: data.birthDate,
          contact: data.contact,
        });
      } catch (error) {
        console.log('내 정보 조회 실패:', error.response?.data || error.message);
      }
    };

    loadInfo();
  }, []);

  const handleVerifyPatient = async () => {
    // TODO: 환자 번호 검증 API 연결
    // 임시 검증 로직
    try {
      const isValid = true; // 예시 조건

      if (isValid) {
        // 유효한 환자 정보
        setIsVerified(true);
        setAlertMessage(`환자 정보가 정상적으로 확인되었습니다.\n방문 날짜를 선택해 주세요.`);
        onVerifiedHandler(userInfo); // 부모에게 환자 정보 전달
        setShowVerifiedAlert(true);
      } else {
        // 유효하지 않은 환자 정보
        setIsVerified(false);
        setAlertMessage(`일치하는 환자 정보가\n존재하지 않습니다.\n해당 병원에 문의해 주세요.`);
        setShowVerifiedAlert(true);
      }
    } catch (error) {
      setIsVerified(false);
      setShowVerifiedAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contentTitle}>개인 정보 확인</Text>
      <NormalInput placeholder={`이름: ${userInfo.name}`} isEditable={false} />
      <NormalInput placeholder={`생년월일: ${userInfo.birth}`} isEditable={false} />
      <NormalInput placeholder={`전화번호: ${userInfo.contact}`} isEditable={false} />
      {/* 검증되지 않은 경우에만 검증 버튼 표시 */}
      {!isVerified && (
        <NormalButton
          title="환자 정보 검증"
          onPressHandler={handleVerifyPatient}
          style={styles.verifyButton}
        />
      )}

      {/* 검증 성공/실패 알림 */}
      <NormalAlert
        show={showVerifyAlert}
        title={isVerified ? '환자 정보 검증 성공' : '환자 정보 검증 실패'}
        message={alertMessage}
        confirmText={isVerified ? '확인' : '다시 입력'}
        onConfirmHandler={() => setShowVerifiedAlert(false)}
      />
    </View>
  );
};

export default PatientVerficationForm;
