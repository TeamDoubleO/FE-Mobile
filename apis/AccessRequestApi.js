import axios from './AxiosInstance';

// 병원 목록 조회
export const getHospitalList = async () => {
  const response = await axios.get('/hospitals');
  return response.data.data;
};

// 환자 번호 검증
// TODO: X-Hospital-Id 수정
export const verifyPatientCode = async (patientCode) => {
  const response = await axios.post(
    '/patients/code',
    { patientCode },
    {
      headers: {
        'X-Hospital-Id': '1',
      },
    },
  );

  return response.data;
};

// 병원의 출입증 발급 가능 날짜 조회
export const getAvailableDates = async (hospitalId) => {
  const response = await axios.get('/hospitals/policies/available-dates', {
    headers: {
      'X-Hospital-Id': hospitalId,
    },
  });
  return response.data.data.availableDates;
};
