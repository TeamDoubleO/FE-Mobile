import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './styles/MyAccessDetailModal.styles';

// TODO: Pass-Service 구현 완료 시, 실제 데이터로 변경 필요
const MyAccessDetailModal = ({ isVisible, onClose, onConfirm, data }) => {
  if (!data) return null;

  // visitorType에 따라 타이틀 결정
  const relationTitle =
    data.visitorType === '환자'
      ? '내 보호자'
      : data.visitorType === '보호자'
        ? '내 환자'
        : '상대방';

  // QR 버튼 노출 조건
  const isQrAvailable = data.approval === '출입 가능';

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.modalTitle}>{data.hospitalName}</Text>
          <Text style={styles.modalContentTitle}>{data.area}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.modalText}>방문자: {data.visitorType}</Text>
            <Text style={styles.modalText}>시작일: {data.startDate}</Text>
            <Text style={styles.modalText}>만료일: {data.expireDate}</Text>
            <Text style={styles.modalText}>승인 여부: {data.approval}</Text>
            <Text style={styles.modalText}>환자 번호: {data.patientNumber}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.modalContentTitle}>{relationTitle}</Text>
            <Text style={styles.modalText}>{`김지수\t|\t010-0000-0000`}</Text>
            <Text style={styles.modalText}>{`손민지\t|\t010-1111-1111`}</Text>
          </View>
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
          {isQrAvailable && (
            <TouchableOpacity style={[styles.button, styles.QRButton]} onPress={onConfirm}>
              <Text style={styles.buttonText}>QR</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MyAccessDetailModal;
