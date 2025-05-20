import { View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import NormalButton from '../components/buttons/NormalButton';
import { styles } from './styles/MainPage.styles';
import QrCards from '../components/cards/QrCards';
import { getAccessList } from '../apis/MyAccessListApi';
import { getHospitalList } from '../apis/AccessRequestApi';
import { getMyInfo } from '../apis/MyPageApi';
// 목업 데이터
import { mockAccessList } from '../mocks/mockAccessList';

// TODO: 리펙토링 할 때 같은 코드는 export해서 import해서 쓰기
// 병원 Id로 병원 이름 찾기
function getHospitalNameByList(hospitalId, hospitalNameList) {
  const hospital = hospitalNameList.find((hospital) => hospital.hospitalId === hospitalId);
  return hospital ? hospital.hospitalName : `병원명 로딩 중 . . .병원: #${hospitalId}`;
}

// 출입증 데이터로 임시 VC 생성
function generateUserVCfromAccessList(mockAccessList, hospitalNameList, userName) {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return mockAccessList.map((item, idx) => ({
    did: `did:example:${String(item.passId).padStart(16, '0')}-${randomNum}`,
    userName,
    hospitalName: getHospitalNameByList(item.hospitalId, hospitalNameList),
    startDate: formatDateTime(item.startedAt),
    expireDate: formatDateTime(item.expiredAt),
    issuedAt: Date.now(),
  }));
}

// 날짜 포맷 함수 (YYYY-MM-DD HH:mm)
const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

const MainPage = () => {
  // 임시: 상태변수로 출입 권한 제어
  const [hasAccessAuthority, setHasAccessAuthority] = useState(true);

  // 임시: QR에 담을 JSON 문자열
  //const qrData = JSON.stringify(userVC);

  const [hospitalNameList, setHospitalNameList] = useState([]);
  const [myAccessList, setMyAccessList] = useState([]);
  const [userVC, setUserVC] = useState([]);
  const [userName, setUserName] = useState('');

  const navigation = useNavigation();

  // 병원, 출입증 데이터 불러오기
  useEffect(() => {
    // 병원 목록 불러오기
    getHospitalList().then(setHospitalNameList);
    getMyInfo().then((data) => {
      setUserName(data.name); // 이름 저장
    });
    // 출입증 목록 불러오기
    //getAccessList().then(setMyAccessList);
    // 목업 출입증 데이터 불러오기
    setMyAccessList(mockAccessList);
  }, []);

  // hospitalNameList, myAccessList 준비되면 userVC 생성
  useEffect(() => {
    if (hospitalNameList.length > 0 && myAccessList.length > 0 && userName) {
      setUserVC(generateUserVCfromAccessList(myAccessList, hospitalNameList, userName));
    }
  }, [hospitalNameList, myAccessList, userName]);

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
