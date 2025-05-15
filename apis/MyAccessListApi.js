import axios from './AxiosInstance';

// 출입증 목록 조회
export const getAccessList = async () => {
  const response = await axios.get('/passes');

  return response.data.data;
};
