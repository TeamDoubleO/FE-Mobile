import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles/GrayButton.styles';

const GrayButton = ({
  title, // 버튼 텍스트
  onPressHandler, // 버튼 클릭 시 핸들러 함수
}) => {
  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default GrayButton;
