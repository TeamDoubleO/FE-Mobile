import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles/AccessRequestRolePage.styles';
import NormalButton from '../components/common/buttons/NormalButton';
import { useState } from 'react';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalCheckbox from '../components/common/checkboxes/NormalCheckbox';

const AccessRequestRolePage = ({ route }) => {
  const { name } = route.params;
  const [selectedRole, setSelectedRole] = useState('patient');
  const [patientNumber, setPatientNumber] = useState('');
  const [checkedDates, setCheckedDates] = useState([]);

  const handlePatientButton = () => {
    setSelectedRole('patient');
  };

  const handleGuardianButton = () => {
    setSelectedRole('guardian');
  };

  const handleDateCheckbox = (newCheckedList) => {
    setCheckedDates(newCheckedList);
  };

  const handleVerifyPatient = () => {
    // TODO: 환자 번호 검증 API 연결
    // 오류 발생 시, errorText 추가
  };

  const handleSubmitButton = () => {
    Alert.alert(
      '출입증 신청',
      '입력된 정보로 출입증을 신청하시겠습니까?',
      [
        {
          text: '확인',
          onPress: () => {
            // TODO: 권한 신청 처리
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

  return (
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
            />
            <TouchableOpacity onPress={handleVerifyPatient} style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>검증</Text>
            </TouchableOpacity>
          </View>

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
        </View>
      )}
      <NormalButton
        title="방문증 신청"
        onPressHandler={handleSubmitButton}
        style={styles.submitButton}
      />
    </KeyboardAwareScrollView>
  );
};

export default AccessRequestRolePage;
