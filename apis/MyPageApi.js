import axios from 'axios';

const BASE_URL = 'http://192.168.0.115:8081';

// 회원 정보 조회 함수
export const getMyInfo = async (token) => {
  const response = await axios.get(`${BASE_URL}/members/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data.data;
};

// 로그아웃 함수
export const logoutUser = async (token) => {
  const response = await axios.post(
    `${BASE_URL}/auth/logout`,
    {}, // body 부분에 빈 객체 명시
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  return response.status;
};

// 회원 탈퇴 함수
export const deleteUser = async (token) => {
  const response = await axios.delete(`${BASE_URL}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  console.log(response.status);
  return response.status;
};
