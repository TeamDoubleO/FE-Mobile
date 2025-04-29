import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import NormalListDeep from '../components/common/lists/NormalListDeep';

//예시데이터
const MyAccessList = [
  {
    hospital_name: '삼성서울병원',
    accessList: [
      { 
        data: {
          log_id: '123',
          building_name: '본관',
          area_name: '3층 중환자실',
          visitor_category: '보호자',
          expired: false,
          timestamp: '2025-05-01 18:00',
          validate_to: '2025-05-01 20:00',
          PatientID: '123456',
          requester_category: '과장',
        }
      },
      { 
        data: {
          log_id: '124',
          building_name: '별관',
          area_name: '2층 병동',
          visitor_category: '환자',
          expired: true,
          timestamp: '2025-03-20 16:00',
          validate_to: '2025-03-20 21:00',
          PatientID: '654321',
          requester_category: '간호사',
        }
      }
    ]
  },
  {
    hospital_name: '아주대병원',
    accessList: [
      { 
        data: {
          log_id: '29002',
          building_name: '본관',
          area_name: '5층 병동',
          visitor_category: '환자',
          expired: false,
          timestamp: '2025-06-10 16:00', 
          validate_to: '2025-06-10 21:00',
          PatientID: '888888',
          requester_category: '과장',
        }
      }
    ]
  },
  {
    hospital_name: '아주대병원2',
    accessList: [
      { 
        data: {
          log_id: '29002',
          building_name: '본관',
          area_name: '5층 병동',
          visitor_category: '환자',
          expired: false,
          timestamp: '2025-06-10 16:00', 
          validate_to: '2025-06-10 21:00',
          PatientID: '888888',
          requester_category: '과장',
        }
      }
    ]
  },
  {
    hospital_name: '아주대병원3',
    accessList: [
      { 
        data: {
          log_id: '29002',
          building_name: '본관',
          area_name: '5층 병동',
          visitor_category: '환자',
          expired: false,
          timestamp: '2025-06-10 16:00', 
          validate_to: '2025-06-10 21:00',
          PatientID: '888888',
          requester_category: '과장',
        }
      }
    ]
  },
  {
    hospital_name: '아주대병원4',
    accessList: [
      { 
        data: {
          log_id: '29002',
          building_name: '본관',
          area_name: '5층 병동',
          visitor_category: '환자',
          expired: false,
          timestamp: '2025-06-10 16:00', 
          validate_to: '2025-06-10 21:00',
          PatientID: '888888',
          requester_category: '과장',
        }
      }
    ]
  },
  {
    hospital_name: '아주대병원5',
    accessList: [
      { 
        data: {
          log_id: '29002',
          building_name: '본관',
          area_name: '5층 병동',
          visitor_category: '환자',
          expired: false,
          timestamp: '2025-06-10 16:00', 
          validate_to: '2025-06-10 21:00',
          PatientID: '888888',
          requester_category: '과장',
        }
      }
    ]
  },
];

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
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
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
