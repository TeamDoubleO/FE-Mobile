import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles/AccessRequestRolePage.styles';
import NormalButton from '../components/buttons/NormalButton';
import { useState } from 'react';
import NormalCheckbox from '../components/checkboxes/NormalCheckbox';
import NormalAlert from '../components/alerts/NormalAlert';
import PatientVerficationForm from '../components/accessRequest/PatientVerficationForm';
import GuardianVerificationForm from '../components/accessRequest/GuardianVerificationForm';
import { useNavigation } from '@react-navigation/native';
import { getAvailableDates } from '../apis/AccessRequestApi';

const AccessRequestRolePage = ({ route }) => {
  const { hospitalId, hospitalName } = route.params;

  const [role, setRole] = useState('patient');
  const [isVerified, setIsVerified] = useState(false); // 검증 여부
  const [verifiedData, setVerifiedData] = useState(null); // 자식 컴포넌트의 검증 정보
  const [checkedDates, setCheckedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]); // 방문 가능 날짜 설정

  // 방문 가능 날짜 불러오기
  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const dates = await getAvailableDates(hospitalId);
        setAvailableDates(dates);
      } catch (error) {
        console.error('방문 가능 날짜 불러오기 실패:', error);
      }
    };

    fetchAvailableDates();
  }, [hospitalId]);

  // Alert 관리 상태변수
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const navigation = useNavigation();

  const handlePatientButton = () => {
    setIsVerified(false);
    setVerifiedData(null);
    setRole('patient');
  };

  const handleGuardianButton = () => {
    setIsVerified(false);
    setVerifiedData(null);
    setRole('guardian');
  };

  const handleVerified = (data) => {
    setIsVerified(true);
    setVerifiedData(data);
  };

  const handleDateCheckbox = (newCheckedList) => {
    setCheckedDates(newCheckedList);
  };

  // 방문증 신청 버튼 클릭 핸들러
  const handleSubmitButton = () => {
    // TODO: 방문증 신청 API 연동 (환자/보호자 전송 & 검증 정보 전송)

    // 날짜 선택 안 하고, 신청 버튼 클릭 시 alert 출력
    if (checkedDates.filter(Boolean).length === 0) {
      setShowErrorAlert(true);
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
        <Text style={styles.title}>{hospitalName}</Text>
        <View style={styles.divider} />
        <View style={styles.buttonContainer}>
          <NormalButton
            title="환자"
            length="short"
            onPressHandler={handlePatientButton}
            isDisabled={role === 'guardian'}
          />
          <NormalButton
            title="보호자"
            length="short"
            onPressHandler={handleGuardianButton}
            isDisabled={role === 'patient'}
          />
        </View>

        {/* 환자 신청 정보 검증 컴포넌트 & 보호자 신청 정보 검증 컴포넌트 분리 */}
        <View style={styles.contentContainer}>
          {role === 'patient' ? (
            <PatientVerficationForm onVerifiedHandler={handleVerified} />
          ) : (
            <GuardianVerificationForm onVerifiedHandler={handleVerified} />
          )}

          {/* 검증 성공 후에만 방문일시 + 신청 버튼 표시 */}
          {isVerified && (
            <>
              <Text style={styles.contentTitle}>방문 일시 선택</Text>
              <NormalCheckbox labels={availableDates} onChangeHandler={handleDateCheckbox} />
              <NormalButton
                title="방문증 신청"
                onPressHandler={handleSubmitButton}
                style={styles.submitButton}
              />
            </>
          )}
        </View>
      </KeyboardAwareScrollView>

      {/* 방문 일시 선택 누락 시 알림 */}
      <NormalAlert
        show={showErrorAlert}
        title="방문증 신청 불가"
        message={`방문 일시 선택 후\n방문증을 신청해주세요.`}
        onConfirmHandler={() => setShowErrorAlert(false)}
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
