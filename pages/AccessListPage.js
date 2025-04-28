import { View, Text } from 'react-native';
import NormalList from '../components/common/lists/NormalList';

const list = ['내 출입 권한 목록 조회']
const list2 = ['출입 권한 신청']

const AccessListPage = () => {
  return (
    <View>
      <NormalList items={list} nextPage='MyAccessListPage'/>
      <NormalList items={list2} nextPage='MainPage'/>
    </View>
  );
}

export default AccessListPage;