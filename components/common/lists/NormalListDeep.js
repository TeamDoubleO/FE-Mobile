import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import NormalList from './NormalList';
import { styles } from './styles/NormalListDeep.styles'; //노말리스트와 같은 컴포넌트 스타일을 사용

const NormalListDeep = ({ 
    sections = [], 
    onItemPress,
    renderItem,
}) => {
    //style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}
  return (
    <ScrollView style={styles.scrollView}>
      {sections.map((section, idx) => (
        console.log('Section', section),
        <View key={section.contentTitle || idx}  style={styles.itemBox}>
          <Text style={styles.itemText}>
            {section.contentTitle}
          </Text>
          <NormalList
            items={section.accessList}
            renderItem={renderItem}
            //nextPage={nextPage}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default NormalListDeep;
