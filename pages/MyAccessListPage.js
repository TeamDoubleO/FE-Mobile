import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NormalListDeep from '../components/lists/NormalListDeep';
//import { MyAccessList } from '../mocks/MyAccessListSample'; //예시 데이터
import { styles } from './styles/MyAccessListPage.styles';
//import NormalAlert from '../components/alerts/NormalAlert';
import { getAccessList } from '../apis/MyAccessListApi';

const MyAccessListPage = () => {
  const [myAccessList, setMyAccessList] = useState([]);

  // Alert 관리 상태변수
  // const [showAlert, setShowAlert] = useState(false);
  // const [alertData, setAlertData] = useState({ title: '', message: '' });

  // 출입증 목록 불러오기
  useEffect(() => {
    const getMyAccessList = async () => {
      try {
        const data = await getAccessList();
        console.log(data.data.data);
        setMyAccessList(data.data.data);
      } catch (error) {
        console.error('출입증 목록 불러오기 실패: ', error);
      }
    };

    getMyAccessList();
  }, []);

  // 아이템 클릭 시 Alert로 상세 정보 표시
  // const handleItemPress = (section, item, index) => {
  //   const access = item.data;

  //   setAlertData({
  //     title: `${section.contentTitle} - 상세 정보`,
  //     message: `건물 및 구역: ${access.building_name} ${access.area_name}\n방문자: ${access.visitor_category}\n만료일: ${access.validate_to}\n승인 여부: ${access.expired ? '출입 대기' : '유효'}\n환자 번호: ${access.PatientID}\n발급자: ${access.requester_category}`,
  //   });

  //   setShowAlert(true);
  // };

  // NormalListDeep에 넘길 데이터 가공
  const sections = myAccessList.map((section) => ({
    contentTitle: section.hospital_name,
    accessList: section.accessList,
  }));

  return (
    <>
      {myAccessList.length > 0 ? (
        <NormalListDeep
          sections={sections} //섹션 데이터 배열
          onItemPress={handleItemPress} //아이템 클릭시 Alert 띄우기
          renderItem={(item, idx, selected) => (
            <View style={styles.container}>
              <View>
                <Text style={styles.textTitle}>
                  {item.data.building_name} {item.data.area_name} - {item.data.visitor_category}
                </Text>
                <Text style={styles.text}>
                  {'\n'}({item.data.validate_to}까지)
                </Text>
              </View>
              <View>
                <Text style={styles.validateText}>
                  {'\n'} {item.data.expired ? '출입 대기' : '유효'}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.infoText}>유효한 출입증이 존재하지 않습니다.</Text>
      )}

      {/* <NormalAlert
        show={showAlert}
        title={alertData.title}
        message={alertData.message}
        onConfirmHandler={() => setShowAlert(false)}
        left={true}
      /> */}
    </>
  );
};

export default MyAccessListPage;
