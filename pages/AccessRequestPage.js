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
      <View style={styles.divider} />
      <NormalInput
        placeholder="방문할 병원 이름을 입력하세요."
        value={searchText}
        onChangeTextHandler={setSearchText}
      />
      <NormalList items={filteredHospitals} nextPage="AccessRequestRolePage" />
    </View>
  );
};

export default AccessRequestPage;
