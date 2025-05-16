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
  const userVC = [
    {
      did: 'did:example:123456789abcdefg01',
      userName: '김엘지',
      hospitalName: '강북삼성병원',
      startDate: '2025-05-17T06:35:05',
      expireDate: '2025-05-18T06:33:09',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg02',
      userName: '김엘지',
      hospitalName: '강북삼성병원',
      startDate: '2025-05-15T08:06:27',
      expireDate: '2025-05-17T08:06:00',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg03',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg04',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg05',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg06',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg07',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg08',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg09',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg10',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg11',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg12',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg13',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg14',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg15',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg16',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg17',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg18',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg19',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    {
      did: 'did:example:123456789abcdefg20',
      userName: '김엘지',
      hospitalName: '건국대학교병원',
      startDate: '2025-05-15T08:08:15',
      expireDate: '2025-05-17T08:06:54',
      issuedAt: Date.now(),
    },
    // ... (이런 식으로 계속 01, 02, 03 ... 40까지 did 값을 고유하게 부여)
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
