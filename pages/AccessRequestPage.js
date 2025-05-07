import { View, Text } from 'react-native';
import { useState } from 'react';
import { styles } from './styles/AccessRequestPage.styles';
import { hospitalName } from '../mocks/hospitalData';
import NormalInput from '../components/common/textinput/NormalInput';
import NormalList from '../components/common/lists/NormalList';

const AccessRequestPage = () => {
  const [searchText, setSearchText] = useState('');

  // 검색 결과 필터링
  const filteredHospitals = hospitalName.filter((name) => name.includes(searchText));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>병원 선택</Text>
      <NormalInput
        placeholder="방문할 병원 이름을 입력하세요."
        value={searchText}
        onChangeTextHandler={setSearchText}
      />
      {filteredHospitals.length > 0 ? (
        <NormalList items={filteredHospitals} nextPage="AccessRequestRolePage" />
      ) : (
        <Text style={styles.infoText}>검색 결과가 존재하지 않습니다.</Text>
      )}
    </View>
  );
};

export default AccessRequestPage;
