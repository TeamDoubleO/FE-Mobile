import axios from 'axios';
import Constants from 'expo-constants';
import { useAuthStore } from '../stores/authStore';

const BASE_URL = Constants.expoConfig.extra.BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// accessToken 가져오는 함수
const getAccessToken = async () => {
  const { accessToken } = useAuthStore.getState();
  return accessToken;
};

// 요청 인터셉터: 모든 요청에 accessToken 자동 첨부
instance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers = config.headers || {}; // headers가 없으면 빈 객체로 초기화
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 Bearer 토큰 추가
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 401(accessToken 만료) → 토큰 재발급 후 재요청
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // 401 에러이면서 아직 재시도 하지 않은 요청만 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { setAccessToken, clearAccessToken } = useAuthStore.getState();
      try {
        // 토큰 재발급 요청
        const refreshResponse = await axios.post(
          '/auth/reissue',
          {},
          {
            baseURL: BASE_URL,
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${await getAccessToken()}`,
            },
          },
        );

        //authorization, Authorization 대소문자 상관없시 추출하도록함
        //새 accessToken을 헤더에서 추출
        let newAccessToken =
          refreshResponse.headers['authorization'] || refreshResponse.headers['Authorization'];

        // newAccessToken이 있으면, 'Bearer ' 접두사 제거 후 공백 제거 후 AsyncStorage에 저장
        if (newAccessToken) {
          const tokenValue = newAccessToken.replace('Bearer ', '').trim();
          setAccessToken(tokenValue);

          // 기존 헤더는 spread로 보존, Authorization만 교체
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${tokenValue}`,
          };

          // POST/PUT 등일 때 data 유실 방지
          if (
            ['post', 'put', 'patch'].includes(originalRequest.method) &&
            !originalRequest.data && // originalRequest에 data가 없고
            error.config.data // 에러 config에 data가 있으면
          ) {
            originalRequest.data = error.config.data; // data를 복구
          }

          // 서버가 토큰 바로 반영 안 할 때를 대비해 약간 딜레이
          await new Promise((resolve) => setTimeout(resolve, 200));
          //새 accessToken으로 원래 요청을 재시도
          return instance(originalRequest);
        }
        //새 accessToken을 받지 못한 경우 에러 반환
        return Promise.reject(new Error('새로운 accessToken을 받지 못했습니다.'));
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError); //에러 반환
      }
    }
    //그 외의 에러 그대로 반환
    return Promise.reject(error);
  },
);

export default instance;
