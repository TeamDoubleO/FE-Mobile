import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NormalListDeep from '../components/lists/NormalListDeep';
import { MyAccessList } from '../mocks/MyAccessListSample'; //예시 데이터
import { styles } from './styles/MyAccessListPage.styles';
import { getAccessList } from '../apis/MyAccessListApi';
import MyAccessDetailModal from '../modals/MyAccessDetailModal';
import { useAuthStore } from '../stores/authStore';

const MyAccessListPage = () => {
  const { setLoading } = useAuthStore();
  const [myAccessList, setMyAccessList] = useState([]);

  // Alert 관리 상태변수
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [selectedAccess, setSelectedAccess] = useState(null); // 클릭된 출입증

  // 출입증 목록 불러오기
  useEffect(() => {
    const getMyAccessList = async () => {
      setLoading(true);
      try {
        const data = await getAccessList();
        console.log(data.data.data);
        setMyAccessList(data.data.data);
      } catch (error) {
        console.error('출입증 목록 불러오기 실패: ', error);
      } finally {
        setLoading(false);
      }
    };
    getMyAccessList();
  }, []);

  // 출입 권한 클릭 시 모달 띄우기
  // TODO: Pass-Service 구현 완료 시, 실제 데이터로 변경 필요
  const handleItemPress = (section, item, index) => {
    const access = item.data;

    setSelectedAccess({
      hospitalName: section.contentTitle,
      area: `${access.building_name} ${access.area_name}`,
      visitorType: access.visitor_category,
      expireDate: access.validate_to,
      approval: access.expired ? '출입 대기' : '유효',
      patientNumber: access.PatientID,
      issuer: access.requester_category,
    });

    setShowModal(true);
  };

  // NormalListDeep에 넘길 데이터 가공
  const sections = myAccessList.map((section) => ({
    contentTitle: section.hospital_name,
    accessList: section.accessList,
  }));

  return (
    <>
      {myAccessList.length > 0 ? (
        <NormalListDeep
          sections={sections}
          onItemPress={handleItemPress}
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

      <MyAccessDetailModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onModify={() => {
          setShowModal(false);
          // TODO: 수정 페이지 이동 시 navigation 사용
        }}
        data={selectedAccess}
      />
    </>
  );
};

export default MyAccessListPage;
