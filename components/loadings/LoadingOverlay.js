import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import KiwiSpinner from './KiwiSpinner';
import { styles } from './styles/LoadingOverlay.styles';

const LoadingOverlay = ({ visible }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <KiwiSpinner />
    </View>
  </Modal>
);

export default LoadingOverlay;
