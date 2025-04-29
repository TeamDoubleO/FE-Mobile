import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import NormalListDeep from '../components/common/lists/NormalListDeep';
import { MyAccessList } from '../mocks/MyAccessListSample' //예시 데이터

const MyAccessListPage = () => {
  // 실제 네비게이션 연결 시 navigation 사용
  const handleItemPress = (section, item, index) => {
    // 상세 데이터 찾아서 넘기기
    // navigation.navigate('AccessDetailPage', { access: item.data });
    // 여기선 Alert로 대체
    const access = item.data;
  };

  // NormalListDeep에 넘길 데이터 가공
  const sections = MyAccessList.map(section => ({
    contentTitle: section.hospital_name,
    accessList: section.accessList
  }));

  return (
    <>
      <NormalListDeep
        sections={sections}
        onItemPress={handleItemPress}
        nextPage="AccessDetailPage"
        renderItem={(item, idx, selected ) => (
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{}}>
              <Text>{item.data.building_name} {item.data.area_name} - {item.data.visitor_category}</Text>
              <Text>{'\n'}({item.data.validate_to}까지)</Text>
            </View>
            <View style={{}}>
              <Text>{'\n'}{item.data.expired ? '만료' : '유효'}</Text>
            </View>
          </View>
          )}
      />
    </>
  );
};

export default MyAccessListPage;
