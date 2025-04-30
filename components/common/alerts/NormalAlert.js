import React from 'react';
import { styles } from './styles/NormalAlert.styles';
import AwesomeAlert from 'react-native-awesome-alerts';

const NormalAlert = ({
  show, // Alert 표시 여부 boolean 값 (상태 변수로 관리)
  title, // Alert 제목
  message, // Alert 메시지
  showCancel = false, // 취소 버튼 표시 여부
  confirmText = '확인', // 확인 버튼 텍스트
  cancelText = '취소', // 취소 버튼 텍스트
  onConfirmHandler, // 확인 버튼 핸들러
  onCancelHandler, // 취소 버튼 핸들러
  left = false, // message left 정렬 여부
}) => {
  return (
    <AwesomeAlert
      show={show} // Alert 표시 여부 제어 핸들러
      title={title} // Alert 제목
      message={message} // Alert 메시지
      showConfirmButton={true} // 확인 버튼 표시 여부
      showCancelButton={showCancel} // 취소 버튼 표시 여부
      confirmText={confirmText} // 확인 버튼 텍스트
      cancelText={cancelText} // 취소 버튼 텍스트
      // 동작 제어
      onConfirmPressed={onConfirmHandler} // 확인 버튼 클릭 핸들러
      onCancelPressed={onCancelHandler} // 취소 버튼 클릭 핸들러
      closeOnTouchOutside={false} // Alert 외부 영역 터치 시, 닫히지 않도록 설정
      closeOnHardwareBackPress={false} // Android에서 뒤로가기 클릭 시, Alert 닫히지 않도록 설정
      // 스타일 지정
      contentContainerStyle={styles.alert} // Alert 창 스타일
      titleStyle={styles.alertTitle} // Alert 제목 스타일
      messageStyle={[styles.alertMessage, left && styles.alertMessageLeft]} // Alert 메시지 스타일
      confirmButtonStyle={styles.alertConfirm} // 확인 버튼 스타일
      cancelButtonStyle={styles.alertCancel} // 취소 버튼 스타일
      confirmButtonTextStyle={styles.alertButtonText} // 확인 버튼 텍스트 스타일
      cancelButtonTextStyle={styles.alertButtonText} // 취소 버튼 텍스트 스타일
    />
  );
};

export default NormalAlert;
