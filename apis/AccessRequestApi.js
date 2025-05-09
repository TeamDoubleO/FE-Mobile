import axios from './AxiosInstance';

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
