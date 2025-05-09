import axios from './AxiosInstance';

// 마이 페이지 진입 시, 비밀번호 검증 함수
export const verifyPassword = async (password) => {
  const response = await axios.post('/members/me/password', { password });
  return response.data;
};

// 비밀번호 변경 함수
export const updatePassword = async (data) => {
  const response = await axios.patch('/members/me/password', {
    passwordOriginal: data.originalPassword,
    passwordNew: data.newPassword,
  });
  return response.data;
};
