import { Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/NormalList.styles'; //노말리스트와 같은 컴포넌트 스타일을 사용
import { useNavigation } from '@react-navigation/native';

const MenuList = ({ items, style }) => {
  // 선택 항목의 index 저장
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigation = useNavigation();

  handleSelect = (index) => {
    setSelectedIndex(index);
    const { nextPage, label } = items[index];
    if (nextPage) {
      navigation.navigate(nextPage, { name: label });
    }
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelect(index)}
          style={[styles.itemBox, selectedIndex === index && styles.selectedItemBox, style]}
        >
          <Text style={[styles.itemText, selectedIndex === index && styles.selectedItemText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MenuList;
