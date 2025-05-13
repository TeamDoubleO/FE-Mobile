import axios from './AxiosInstance';

// 병원 목록 조회
export const getHospitalList = async () => {
  const response = await axios.get('/hospitals');

  return response.data.data;
};

// 환자 번호 검증
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
