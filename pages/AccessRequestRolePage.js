import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles/AccessRequestRolePage.styles';
import NormalButton from '../components/buttons/NormalButton';
import { useState } from 'react';
import NormalInput from '../components/textinputs/NormalInput';
import NormalCheckbox from '../components/checkboxes/NormalCheckbox';
import NormalAlert from '../components/alerts/NormalAlert';
import { useNavigation } from '@react-navigation/native';

const AccessRequestRolePage = ({ route }) => {
  const { name } = route.params;
  const [selectedRole, setSelectedRole] = useState('patient');
  const [patientNumber, setPatientNumber] = useState(''); // 환자 번호 관리
  const [isVerified, setIsVerified] = useState(false); // 환자 번호 검증 여부
  const [isVerifying, setIsVerifying] = useState(false); // 검증 실행 여부
  const [checkedDates, setCheckedDates] = useState([]); // 선택 날짜 관리

  // Alert 관리 상태변수
  const [showVerifyAlert, setShowVerifiedAlert] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showInvalidDateAlert, setShowInvalidDateAlert] = useState(false);

  const navigation = useNavigation();

  const handlePatientButton = () => {
    setSelectedRole('patient');
  };

  const handleGuardianButton = () => {
    setSelectedRole('guardian');
  };

  const handleDateCheckbox = (newCheckedList) => {
    setCheckedDates(newCheckedList);
  };

  // 환자 번호 검증 버튼 클릭 핸들러
  const handleVerifyPatient = async () => {
    setIsVerifying(true);

    // TODO: 환자 번호 검증 API 연결
    // 임시 검증 로직
    try {
      const isValid = patientNumber === '1234'; // 예시 조건

      if (isValid) {
        // 유효한 환자 번호
        setIsVerified(true);
        setShowVerifiedAlert(true);
      } else {
        // 유효하지 않은 환자 번호
        setIsVerified(false);
        setShowVerifiedAlert(true);
        setPatientNumber('');
      }
    } catch (error) {
      setIsVerified(false);
      setShowVerifiedAlert(true);
    } finally {
      setIsVerifying(false);
    }
  };

  // 방문증 신청 버튼 클릭 핸들러
  const handleSubmitButton = () => {
    // 날짜 선택 안 하고, 신청 버튼 클릭 시 alert 출력
    if (checkedDates.filter(Boolean).length === 0) {
      setShowInvalidDateAlert(true);
    } else {
      setShowConfirmAlert(true);
    }
  };

  // 방문증 신청 확인 버튼 클릭 핸들러
  const handleConfirmChange = () => {
    setShowConfirmAlert(false);
    setTimeout(() => {
      setShowSuccessAlert(true);
    }, 300); // 300ms 정도 텀을 둠 (ios는 모달이 닫히자 마자 열리게 하면)
  };

  // 방문증 신청 성공 핸들러
  const handleSuccessConfirm = () => {
    setShowSuccessAlert(false);

    // 메인 페이지로 이동되도록 설정
    navigation.navigate('MainPage');
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
        extraScrollHeight={40} // 키보드와 입력창 사이 간격
        enableOnAndroid={true} // 안드로이드 자동 스크롤 설정
      >
        <Text style={styles.title}>{name}</Text>
        <View style={styles.divider} />
        <View style={styles.buttonContainer}>
          {selectedRole == 'patient' ? (
            <>
              <NormalButton title="환자" length="short" onPressHandler={handlePatientButton} />
              <NormalButton
                title="보호자"
                length="short"
                onPressHandler={handleGuardianButton}
                isDisabled={true}
              />
            </>
          ) : (
            <>
              <NormalButton
                title="환자"
                length="short"
                onPressHandler={handlePatientButton}
                isDisabled={true}
              />
              <NormalButton title="보호자" length="short" onPressHandler={handleGuardianButton} />
            </>
          )}
        </View>

        {/* 환자 버튼 클릭 시 추가 */}
        {selectedRole === 'patient' && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>환자 정보 확인</Text>
            <NormalInput placeholder="이름: 김짱구" isEditable={false} />
            <NormalInput placeholder="전화번호: 010-1234-1234" isEditable={false} />
            <NormalInput placeholder="생년월일: 2022-08-02" isEditable={false} />
            <NormalButton
              title="방문증 신청"
              onPressHandler={handleSubmitButton}
              style={styles.submitButton}
            />
          </View>
        )}

        {/* 보호자 버튼 클릭 시 추가 */}
        {selectedRole === 'guardian' && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>환자 번호 입력</Text>
            <View style={styles.inputWithButtonConatiner}>
              <NormalInput
                placeholder="환자 번호를 입력하세요."
                value={patientNumber}
                onChangeTextHandler={setPatientNumber}
                isEditable={isVerified ? false : true}
                inputWrpperWidth={{ width: '90%' }}
              />
              <TouchableOpacity onPress={handleVerifyPatient} style={styles.verifyButton}>
                <Text style={styles.verifyButtonText}>검증</Text>
              </TouchableOpacity>
            </View>

            {/* 검증 성공 후에만 방문일시 + 신청 버튼 표시 */}
            {isVerified && (
              <>
                <Text style={styles.contentTitle}>방문 일시 선택</Text>
                <NormalCheckbox
                  labels={[
                    '2025-08-02',
                    '2025-08-03',
                    '2025-08-04',
                    '2025-08-05',
                    '2025-08-06',
                    '2025-08-07',
                    '2025-08-08',
                  ]}
                  onChangeHandler={handleDateCheckbox}
                />
                <NormalButton
                  title="방문증 신청"
                  onPressHandler={handleSubmitButton}
                  style={styles.submitButton}
                />
              </>
            )}
          </View>
        )}
      </KeyboardAwareScrollView>

      {/* 검증 성공/실패 알림 */}
      <NormalAlert
        show={showVerifyAlert}
        title={isVerified ? '환자 번호 검증 성공' : '환자 번호 검증 실패'}
        message={
          isVerified
            ? '환자 번호가 정상적으로 확인되었습니다.\n방문 날짜를 선택해주세요.'
            : '입력한 환자 번호와 일치하는\n환자 정보가 존재하지 않습니다.'
        }
        confirmText={isVerified ? '확인' : '다시 입력'}
        onConfirmHandler={() => setShowVerifiedAlert(false)}
      />

      {/* 방문일시 선택 누락 시 알림 */}
      <NormalAlert
        show={showInvalidDateAlert}
        title="방문증 신청 불가"
        message={`방문 일시를 선택한 후\n방문증을 신청해 주세요.`}
        onConfirmHandler={() => setShowInvalidDateAlert(false)}
      />

      {/* 방문증 신청 확인 알림 */}
      <NormalAlert
        show={showConfirmAlert}
        title="방문증 신청"
        message={`입력하신 정보로\n방문증을 신청하시겠습니까?`}
        showCancel={true}
        onConfirmHandler={handleConfirmChange}
        onCancelHandler={() => setShowConfirmAlert(false)}
      />

      {/* 신청 성공 알림 */}
      <NormalAlert
        show={showSuccessAlert}
        title="방문증 신청 완료"
        message={`방문증 신청을 완료하였습니다.\n메인 페이지로 이동합니다.`}
        onConfirmHandler={handleSuccessConfirm}
      />
    </>
  );
};

export default AccessRequestRolePage;
