import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/NormalCheckbox.styles';
import { Ionicons } from '@expo/vector-icons';

const NormalCheckbox = ({ labels, onChangeHandler }) => {
  const [checkedList, setCheckedList] = useState(Array(labels.length).fill(false));

  // 체크박스 토글 관리 함수
  const handleToggle = (index) => {
    const updatedList = [...checkedList];
    updatedList[index] = !updatedList[index];
    setCheckedList(updatedList);

    // 부모 컴포넌트에 체크박스 상태 전달
    if (onChangeHandler) onChangeHandler(updatedList);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {labels.map((label, index) => (
        <TouchableOpacity key={index} style={styles.container} onPress={() => handleToggle(index)}>
          <View style={[styles.checkbox, checkedList[index] && styles.checked]}>
            {checkedList[index] && <Ionicons name="checkmark" color="white" />}
          </View>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NormalCheckbox;
