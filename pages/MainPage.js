import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import NormalButton from '../components/common/buttons/NormalButton';

const MainPage = () => {
  const navigation = useNavigation();
  const navigateToAccessList = () => {
    navigation.navigate('AccessListPage');
  };

  const navigateToMyPage = () => {
    navigation.navigate('MyPage');
  };

  return (
    <View>
      <Text>MainPage</Text>
      <View>
        <NormalButton title={'방문신청'} length="short" onPressHandler={navigateToAccessList} />
        <NormalButton title={'마이페이지'} length="short" onPressHandler={navigateToMyPage} />
      </View>
    </View>
  );
};

export default MainPage;
