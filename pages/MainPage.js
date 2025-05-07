import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import NormalButton from '../components/buttons/NormalButton';
import { styles } from './styles/MainPage.styles';
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../constants/colors';

const MainPage = () => {
  // 임시: 상태변수로 출입 권한 제어
  const [hasAccessAuthority, setHasAccessAuthority] = useState(true);

  // 임시: VC에 담을 사용자 정보
  const userVC = {
    did: 'did:example:123456789abcdefghi',
    userName: '김짱구',
    hospital1: '짱구병원',
    hospital2: '흰둥이병원',
    hospital3: '오수병원',
    issuedAt: Date.now(),
  };
  // 임시: QR에 담을 JSON 문자열
  const qrData = JSON.stringify(userVC);

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
      <View style={styles.shadowWrapper}>
        <View style={styles.cardContainer}>
          <Image
            style={styles.backgroundImage}
            source={require('../assets/images/mainBackground.png')}
            resizeMode="contain" // 이미지 비율 유지
          />
          {hasAccessAuthority ? (
            <>
              <Text style={styles.qrTitle}>임시 출입 QR</Text>
              <QRCode
                value={qrData}
                size={140}
                color={colors.black}
                backgroundColor={colors.white}
              />
              <Text style={styles.userName}>{userVC.userName}</Text>
              <Text style={styles.hospital}>{userVC.hospital1}</Text>
              <Text style={styles.hospital}>{userVC.hospital2}</Text>
              <Text style={styles.hospital}>{userVC.hospital3}</Text>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>등록된 출입 권한이 존재하지 않습니다.</Text>
              <Text style={styles.cardSubText}>
                방문 신청 버튼을 눌러 출입 권한을 신청해주세요.
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <NormalButton title="방문 신청" length="short" onPressHandler={navigateToAccessList} />
        <NormalButton title="마이 페이지" length="short" onPressHandler={navigateToMyPage} />
      </View>
    </View>
  );
};

export default MainPage;
