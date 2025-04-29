import React from 'react';
import { View, Text, Alert } from 'react-native';
import NormalListDeep from '../components/common/lists/NormalListDeep';
import { MyAccessList } from '../mocks/MyAccessListSample'; //예시 데이터

const MyAccessListPage = () => {
  // 아이템 클릭 시 Alert로 상세 정보 표시
  const handleItemPress = (section, item, index) => {
    const access = item.data;
    Alert.alert(
      `${section.contentTitle} - 상세 정보`,
      `건물/구역: ${access.building_name} ${access.area_name}\n방문자: ${access.visitor_category}\n만료일: ${access.validate_to}\n만료여부: ${access.expired ? '만료' : '유효'}\n환자번호: ${access.PatientID}\n발급자: ${access.requester_category}`,
    );
  };

  // NormalListDeep에 넘길 데이터 가공
  const sections = MyAccessList.map((section) => ({
    contentTitle: section.hospital_name,
    accessList: section.accessList,
  }));

  return (
    <>
      <NormalListDeep
        sections={sections} //섹션 데이터 배열
        onItemPress={handleItemPress} //아이템 클릭시 Alert 띄우기
        renderItem={(item, idx, selected) => (
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text>
                {item.data.building_name} {item.data.area_name} - {item.data.visitor_category}
              </Text>
              <Text>
                {'\n'}({item.data.validate_to}까지)
              </Text>
            </View>
            <View style={{}}>
              <Text>
                {'\n'}
                {item.data.expired ? '만료' : '유효'}
              </Text>
            </View>
          </View>
        )}
      />
    </>
  );
};

export default MyAccessListPage;
