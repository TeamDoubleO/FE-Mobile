import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './styles/MyAccessDetailModal.styles';

// TODO: Pass-Service 구현 완료 시, 실제 데이터로 변경 필요
const MyAccessDetailModal = ({ isVisible, onClose, onConfirm, data }) => {
  if (!data) return null;

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{data.hospitalName}</Text>
        <Text style={styles.modalContentTitle}>{data.area}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.modalText}>방문자: {data.visitorType}</Text>
          <Text style={styles.modalText}>만료일: {data.expireDate}</Text>
          <Text style={styles.modalText}>승인 여부: {data.approval}</Text>
          <Text style={styles.modalText}>환자 번호: {data.patientNumber}</Text>
        </View>
        <Text style={styles.modalContentTitle}>내 보호자</Text>
        <View style={styles.textContainer}>
          <Text style={styles.modalText}>{`김OO\t|\t010-0000-0000`}</Text>
          <Text style={styles.modalText}>{`김OO\t|\t010-0000-0000`}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.QRButton]} onPress={onConfirm}>
            <Text style={styles.buttonText}>QR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyAccessDetailModal;
