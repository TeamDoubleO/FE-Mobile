import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './styles/AccessRequestPage.styles';
import NormalInput from '../components/textinputs/NormalInput';
import NormalList from '../components/lists/NormalList';
import { getHospitalList } from '../apis/AccessRequestApi';
import { useAuthStore } from '../stores/authStore';

const AccessRequestPage = () => {
  const { setLoading } = useAuthStore();
  const [searchText, setSearchText] = useState('');
  const [hospitalName, setHospitalName] = useState([]);

  // 병원 목록 불러오기
  useEffect(() => {
    const getHospitalsName = async () => {
      setLoading(true);
      try {
        const data = await getHospitalList();
        console.log(data);

        setHospitalName(data);
      } catch (error) {
        console.error('병원 목록 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    getHospitalsName();
  }, []);

  // 검색 결과 필터링
  const filteredHospitals = hospitalName.filter((hospital) =>
    hospital.hospitalName.includes(searchText),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>병원 선택</Text>
      <NormalInput
        placeholder="방문할 병원 이름을 입력하세요."
        value={searchText}
        onChangeTextHandler={setSearchText}
      />
      {filteredHospitals.length > 0 ? (
        <NormalList
          items={filteredHospitals}
          nextPage="AccessRequestRolePage"
          renderItem={(item, index, isSelected) => (
            <Text style={styles.itemText}>{item.hospitalName}</Text>
          )}
          navigationParams={(item) => ({
            hospitalId: item.hospitalId,
            hospitalName: item.hospitalName,
          })}
        />
      ) : (
        <Text style={styles.infoText}>검색 결과가 존재하지 않습니다.</Text>
      )}
    </View>
  );
};

export default AccessRequestPage;
