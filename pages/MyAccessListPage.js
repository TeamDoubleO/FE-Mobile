import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NormalListDeep from '../components/lists/NormalListDeep';
import { styles } from './styles/MyAccessListPage.styles';
import { getAccessList } from '../apis/MyAccessListApi';
import { getHospitalList } from '../apis/AccessRequestApi';
import MyAccessDetailModal from '../modals/MyAccessDetailModal';
import { useAuthStore } from '../stores/authStore';

// 더미 데이터 (로컬 테스트 용)
const mockAccessList = [
  {
    passId: 4,
    memberId: 1,
    hospitalId: 1,
    accessAreaNames: ['A동-1층-01호', 'A동-1층-02호', 'A동-1층-03호'],
    visitCategory: 'PATIENT',
    patientId: 9,
    startedAt: '2025-05-17T06:35:05',
    expiredAt: '3000-05-15T06:33:09',
  },
  {
    passId: 5,
    memberId: 1,
    hospitalId: 1,
    accessAreaNames: ['B동-1층-01호', 'B동-2층-04호'],
    visitCategory: 'PATIENT',
    patientId: 9,
    startedAt: '2025-05-15T08:06:27',
    expiredAt: '2025-05-15T08:06:00',
  },
  {
    passId: 6,
    memberId: 1,
    hospitalId: 2,
    accessAreaNames: ['C동-5층-01호'],
    visitCategory: 'GUARDIAN',
    patientId: 10,
    startedAt: '2025-05-15T08:08:15',
    expiredAt: '3000-05-15T08:06:54',
  },
  {
    passId: 7,
    memberId: 1,
    hospitalId: 3,
    accessAreaNames: [
      '희망 병동 7층 소아청소년과 집중치료실 713호',
      '사랑관 5층 암센터 항암치료실 502호',
      '사랑관 5층 암센터 항암치료실 503호',
      // '사랑관 5층 암센터 항암치료실 504호',
      // '사랑관 5층 암센터 항암치료실 505호',
      // '사랑관 5층 암센터 항암치료실 506호',
    ],
    visitCategory: 'GUARDIAN',
    patientId: 10,
    startedAt: '2025-05-15T08:08:15',
    expiredAt: '3000-05-15T08:06:54',
  },
  {
    passId: 8,
    memberId: 1,
    hospitalId: 3,
    accessAreaNames: ['소망관 3층 응급의학과 외상전용 수술실 320호'],
    visitCategory: 'GUARDIAN',
    patientId: 10,
    startedAt: '2025-05-15T08:08:15',
    expiredAt: '3000-05-15T08:06:54',
  },
];

const MyAccessListPage = () => {
  const { setLoading } = useAuthStore();
  const [myAccessList, setMyAccessList] = useState([]);
  const [hospitalNameList, setHospitalNameList] = useState([]);

  // Alert 관리 상태변수
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [selectedAccess, setSelectedAccess] = useState(null); // 클릭된 출입증

  // 병원 목록 불러오기
  useEffect(() => {
    const getHospitalsName = async () => {
      setLoading(true);
      try {
        const data = await getHospitalList();
        setHospitalNameList(data); // [{ hospitalId, hospitalName }]
      } catch (error) {
        console.error('병원 목록 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    getHospitalsName();
  }, [setLoading]);

  // 출입증 목록 불러오기
  // useEffect(() => {
  //   const getMyAccessList = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await getAccessList();
  //       console.log(data);
  //       setMyAccessList(data);
  //     } catch (error) {
  //       console.error('출입증 목록 불러오기 실패: ', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getMyAccessList();
  // }, [setLoading]);

  // 임시 데이터 적용
  useEffect(() => {
    setMyAccessList(mockAccessList); // 위에서 만든 mock 데이터로 대체
  }, []);

  // 출입 권한 클릭 시 모달 띄우기
  // TODO: Pass-Service 구현 완료 시, 실제 데이터로 변경 필요
  const handleItemPress = (section, item, index) => {
    const access = item.data;

    setSelectedAccess({
      hospitalName: section.contentTitle,
      // area: (access.accessAreaNames || []).join(',\n'),
      area: (access.accessAreaNames || []).map((name) => `- ${name}`).join('\n'),
      visitorType: getVisitCategoryLabel(access.visitCategory),
      startDate: formatDateTime(access.startedAt),
      expireDate: formatDateTime(access.expiredAt),
      approval: getApprovalStatus(access.startedAt, access.expiredAt),
      patientNumber: access.patientId,
      issuer: access.memberId,
    });

    setShowModal(true);
  };

  // visitCategory 변환 함수
  const getVisitCategoryLabel = (category) => {
    switch (category) {
      case 'PATIENT':
        return '환자';
      case 'GUARDIAN':
        return '보호자';
      default:
        return category; // 혹시 모르는 값은 그대로 표기
    }
  };

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

  // 출입 가능 상태 함수
  const getApprovalStatus = (startedAt, expiredAt) => {
    const now = new Date();
    const start = new Date(startedAt);
    const end = new Date(expiredAt);

    if (start > now) {
      return '출입 대기';
    } else if (end < now) {
      return '만료';
    } else {
      return '유효';
    }
  };

  //병원 Id로 병원 이름 찾기
  const getHospitalName = (hospitalId) => {
    const hospital = hospitalNameList.find((hospital) => hospital.hospitalId === hospitalId);
    // 병원 목록에 없으면 병원 #id로 표시
    return hospital ? hospital.hospitalName : `병원명 로딩 중 . . .병원: #${hospitalId}`;
  };

  // NormalListDeep에 넘길 데이터 가공
  const sections = myAccessList.reduce((acc, cur) => {
    //acc - accumulator(누적값, 병원별로 묶안 배열), cur - current(현재 배열에서 처리중인 값)
    const hospitalId = cur.hospitalId;
    let hospitalName = getHospitalName(hospitalId); //id로 이름 찾아서 저장
    let section = acc.find((sec) => sec.hospitalId === hospitalId); //현재 hospitalId와 같은 section이 있는지 찾는다.
    if (!section) {
      //섹션이 없으면 새로운 섹션 객체를 만들어 acc에 추가한다.
      section = {
        hospitalId,
        contentTitle: hospitalName,
        accessList: [],
      };
      acc.push(section);
    }
    section.accessList.push(cur); //해당 병원 그룹의 accessList 배열에 현재 출입증 추가
    return acc; //누적값 반환해서 다음 루프에 이어감
  }, []);

  return (
    <>
      {sections.length > 0 ? (
        <NormalListDeep
          sections={sections.map((section) => ({
            ...section,
            accessList: section.accessList.map((item) => ({ data: item })),
          }))}
          onItemPress={handleItemPress}
          renderItem={(itemObj, idx, selected) => {
            const item = itemObj.data;
            return (
              <View style={styles.container}>
                <View>
                  <Text style={styles.textTitle}>
                    {getVisitCategoryLabel(item.visitCategory)} {'\n\n'}
                    {(item.accessAreaNames || []).join('\n')}
                  </Text>
                  <Text style={styles.text}>
                    {'\n'}발급일: {formatDateTime(item.startedAt)}
                    {'\n'}만료일: {formatDateTime(item.expiredAt)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.validateText}>
                    {'\n'} {getApprovalStatus(item.startedAt, item.expiredAt)}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text style={styles.infoText}>유효한 출입증이 존재하지 않습니다.</Text>
      )}

      <MyAccessDetailModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onModify={() => {
          setShowModal(false);
          // TODO: 수정 페이지 이동 시 navigation 사용
        }}
        data={selectedAccess}
      />
    </>
  );
};

export default MyAccessListPage;
