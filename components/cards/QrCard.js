import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

import NormalButton from '../../components/buttons/NormalButton';
import { styles } from './styles/QrCard.styles';
import { colors } from '../../constants/colors';

// hasAccessAuthority: 출입 권한 여부, userVC : VC에 담을 사용자 정보, qrData : QR에 담을 JSON 문자열
const QrCard = ({ hasAccessAuthority, userVC, qrData }) => {
  // 해당 QR의 상세 페이지로 이동 (아직 미구현)
  //const navigation = useNavigation();
  //   const navigateToAccessListDeatail = () => {
  //     navigation.navigate('AccessListDetailPage');
  //   };

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.backgroundImage}
          source={require('../../assets/images/mainBackground.png')}
          resizeMode="contain" // 이미지 비율 유지
        />
        {hasAccessAuthority ? (
          <>
            <Text style={styles.qrTitle}>임시 출입 QR</Text>
            <QRCode value={qrData} size={140} color={colors.black} backgroundColor={colors.white} />
            <Text style={styles.userName}>{userVC.userName}</Text>
            <Text style={styles.hospital}>{userVC.hospital1}</Text>
            <Text style={styles.hospital}>{userVC.hospital2}</Text>
            <Text style={styles.hospital}>{userVC.hospital3}</Text>
          </>
        ) : (
          <>
            <Text style={styles.cardText}>등록된 출입 권한이 존재하지 않습니다.</Text>
            <Text style={styles.cardSubText}>방문 신청 버튼을 눌러 출입 권한을 신청해주세요.</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default QrCard;
