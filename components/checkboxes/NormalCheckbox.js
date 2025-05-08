import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/NormalCheckbox.styles';
import { Ionicons } from '@expo/vector-icons';

const NormalCheckbox = ({ labels, onChangeHandler, style }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 체크박스 토글 관리 함수
  const handleToggle = (index) => {
    const newIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newIndex);

    // 부모 컴포넌트에 선택 상태 전달
    if (onChangeHandler) {
      // 선택된 항목만 true, 나머지는 false로 구성된 배열로 전달
      const result = labels.map((_, i) => i === newIndex);
      onChangeHandler(result);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {labels.map((label, index) => (
        <TouchableOpacity key={index} style={styles.container} onPress={() => handleToggle(index)}>
          <View style={[styles.checkbox, selectedIndex === index && styles.checked, style]}>
            {selectedIndex === index && <Ionicons name="checkmark" color="white" />}
          </View>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NormalCheckbox;
