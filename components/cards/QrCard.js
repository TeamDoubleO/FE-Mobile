import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

import NormalButton from '../../components/buttons/NormalButton';
import { styles } from './styles/QrCard.styles';
import { colors } from '../../constants/colors';
import { hospitalName } from '../../mocks/hospitalData';

// hasAccessAuthority: 출입 권한 여부, userVC : VC에 담을 사용자 정보, qrData : QR에 담을 JSON 문자열
const QrCard = ({ hasAccessAuthority, did, userName, hospitalName, startDate, expireDate }) => {
  // 해당 QR의 상세 페이지로 이동 (아직 미구현)
  //const navigation = useNavigation();
  //   const navigateToAccessListDeatail = () => {
  //     navigation.navigate('AccessListDetailPage');
  //   };

  // 임시: QR에 담을 JSON 문자열
  const qrData = JSON.stringify({ did, userName, hospitalName, startDate, expireDate });
  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.backgroundImage}
          source={require('../../assets/images/mainBackground.png')}
          resizeMode="contain" // 이미지 비율 유지
        />
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          {hasAccessAuthority ? (
            <>
              <Text style={styles.qrTitle}>임시 출입 QR</Text>
              <QRCode
                value={qrData}
                size={140}
                color={colors.black}
                backgroundColor={colors.white}
              />
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.hospital}>{hospitalName}</Text>
              <Text style={styles.hospital}>시작일: {startDate}</Text>
              <Text style={styles.hospital}>만료일: {expireDate}</Text>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>등록된 출입 권한이 존재하지 않습니다.</Text>
              <Text style={styles.cardSubText}>
                방문 신청 버튼을 눌러 출입 권한을 신청해주세요.
              </Text>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default QrCard;
