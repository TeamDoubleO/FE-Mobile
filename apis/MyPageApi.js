import axios from './AxiosInstance';

// 회원 정보 조회 함수
export const getMyInfo = async (token) => {
  const response = await axios.get('/members/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

// 로그아웃 함수
export const logoutUser = async (token) => {
  const response = await axios.post(
    '/auth/logout',
    {}, // body 부분에 빈 객체 명시
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.status;
};

// 회원 탈퇴 함수
export const deleteUser = async (token) => {
  const response = await axios.delete('/members', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.status;
};
