import { Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/NormalList.styles';
import { useNavigation } from '@react-navigation/native';

const NormalList = ({ items, nextPage }) => {
  // 선택 항목의 index 저장
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigation = useNavigation();

  const handleSelect = (index) => {
    // 상태변수 변경
    setSelectedIndex(index);

    if (nextPage) {
      // name: 병원명 혹은 메뉴명
      navigation.navigate(nextPage, { name: items[index] });
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelect(index)}
          style={[styles.itemBox, selectedIndex === index && styles.selectedItemBox]}
        >
          <Text style={[styles.itemText, selectedIndex === index && styles.selectedItemText]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NormalList;
