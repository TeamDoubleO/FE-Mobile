import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
  persist(
    (set) => ({
      //토큰 상태 관리
      accessToken: null,
      setAccessToken: (token) =>
        set({
          accessToken: token,
          isLoggedIn: !!token,
        }),
      clearAccessToken: () =>
        set({
          accessToken: null,
          isLoggedIn: false,
        }),

      // 로그인 상태 관리
      isLoggedIn: false,
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),

      // 로딩 상태 관리
      loading: false,
      setLoading: (value) => set({ loading: value }),

      // 로그아웃시 상태 설정
      // logout: () =>
      //   set({
      //     isLoggedIn: false,
      //     accessToken: null,
      //   }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      whitelist: ['accessToken', 'isLoggedIn'],
    },
  ),
);
