import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import NormalButton from '../components/buttons/NormalButton';
import { styles } from './styles/MainPage.styles';
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../constants/colors';
import QrCards from '../components/cards/QrCards';

const MainPage = () => {
  // 임시: 상태변수로 출입 권한 제어
  const [hasAccessAuthority, setHasAccessAuthority] = useState(true);

  // 임시: VC에 담을 사용자 정보
  const userVC = [
    {
      did: 'did:example:123456789abcdefghi',
      userName: '김짱구',
      hospitalName: '짱구병원',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefdhi',
      userName: '김짱구',
      hospitalName: '흰둥이병원',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdeffhi',
      userName: '김짱구',
      hospitalName: '오수병원',
      issuedAt: Date.now(),
    },
  ];
  // 임시: QR에 담을 JSON 문자열
  //const qrData = JSON.stringify(userVC);

  const navigation = useNavigation();

  const navigateToAccessList = () => {
    navigation.navigate('AccessListPage');
  };

  const navigateToMyPage = () => {
    navigation.navigate('MyPage');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require('../assets/images/logoGreen.png')}
        resizeMode="contain" // 이미지 비율 유지
      />
      <QrCards hasAccessAuthority={hasAccessAuthority} userVC={userVC} />
      <View style={styles.buttonContainer}>
        <NormalButton title="방문 신청" length="short" onPressHandler={navigateToAccessList} />
        <NormalButton title="마이 페이지" length="short" onPressHandler={navigateToMyPage} />
      </View>
    </View>
  );
};

export default MainPage;
