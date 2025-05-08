import axios from './AxiosInstance';

// 로그인 함수
export const loginUser = async (form) => {
  const response = await axios.post('/auth/login', {
    email: form.email,
    password: form.pw,
  });

  return response.data;
};
