import axios from 'axios';

const BASE_URL = 'http://192.168.0.115:8081';

// 마이 페이지 진입 시, 비밀번호 검증 함수
export const verifyPassword = async (token, password) => {
  const response = await axios.post(
    `${BASE_URL}/members/me/password`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  return response.data;
};

// 비밀번호 변경 함수
export const updatePassword = async (token, data) => {
  const response = await axios.patch(
    `${BASE_URL}/members/me/password`,
    {
      passwordOriginal: data.originalPassword,
      passwordNew: data.newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  return response.data;
};
