import axios from './AxiosInstance';

// 출입증 목록 조회
export const getAccessList = () => {
  const response = axios.get('/passes');

  return response;
};
