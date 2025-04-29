import { Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/NormalList.styles';
import { useNavigation } from '@react-navigation/native';

const NormalList = ({ 
  items = [], // props가 없거나 undefined일 때를 방지
  nextPage,
  onItemPress,
  renderItem,
  style
}) => {
  // 선택 항목의 index 저장
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigation = useNavigation();

  const handleSelect = (index) => {
    // 상태변수 변경
    setSelectedIndex(index);
    // onItemPress prop이 있으면 실행 
    if (onItemPress) {
      onItemPress(items[index], index);
    }
    // nextPage prop이 있으면 해당 페이지로 이동
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
          style={[styles.itemBox, selectedIndex === index && styles.selectedItemBox, style]}
        >
          {renderItem ? 
          renderItem(item, index, selectedIndex === index)
          : 
            <Text style={[styles.itemText, selectedIndex === index && styles.selectedItemText]}>
              {item}
            </Text>
          }
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NormalList;
