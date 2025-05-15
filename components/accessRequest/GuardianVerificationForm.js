import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles/GuardianVerificationForm.styles';
import { useState } from 'react';
import NormalInput from '../textinputs/NormalInput';
import NormalAlert from '../alerts/NormalAlert';
import { verifyPatientCode } from '../../apis/AccessRequestApi';
import { useAuthStore } from '../../stores/authStore';

const GuardianVerificationForm = ({ onVerifiedHandler }) => {
  const { setLoading } = useAuthStore();
  const [patientCode, setPatientCode] = useState(''); // 환자 번호 관리
  const [isVerified, setIsVerified] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Alert 관리 상태변수
  const [showVerifyAlert, setShowVerifiedAlert] = useState(false);

  // 환자 번호 검증 버튼 클릭 핸들러
  const handleVerifyPatient = async () => {
    setLoading(true);
    try {
      await verifyPatientCode(patientCode);

      // 유효한 환자 번호
      setIsVerified(true);
      setAlertMessage(`환자 번호가 정상적으로 확인되었습니다.\n방문 날짜를 선택해 주세요.`);
      onVerifiedHandler(patientCode); // 부모에게 환자 정보 전달
      setShowVerifiedAlert(true);
    } catch (error) {
      // 유효하지 않은 환자 번호
      setIsVerified(false);
      setAlertMessage(`일치하는 환자 정보가\n존재하지 않습니다.\n확인 후 다시 입력해 주세요.`);
      setShowVerifiedAlert(true);
      setPatientCode('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contentTitle}>환자 번호 입력</Text>
      <View style={styles.inputWithButtonConatiner}>
        <NormalInput
          placeholder="환자 번호를 입력하세요."
          value={patientCode}
          onChangeTextHandler={setPatientCode}
          isEditable={isVerified ? false : true}
          inputWrpperWidth={{ width: '90%' }}
        />
        <TouchableOpacity onPress={handleVerifyPatient} style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>검증</Text>
        </TouchableOpacity>
      </View>

      {/* 검증 성공/실패 알림 */}
      <NormalAlert
        show={showVerifyAlert}
        title={isVerified ? '환자 번호 검증 성공' : '환자 번호 검증 실패'}
        message={alertMessage}
        confirmText={isVerified ? '확인' : '다시 입력'}
        onConfirmHandler={() => setShowVerifiedAlert(false)}
      />
    </View>
  );
};

export default GuardianVerificationForm;
