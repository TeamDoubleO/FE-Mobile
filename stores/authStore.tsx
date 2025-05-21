import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setOnlyAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      //토큰 상태 관리
      accessToken: null,
      setAccessToken: (token) =>
        set({
          accessToken: token,
          isLoggedIn: !!token,
        }),
      //토큰 값만 설정할 때 사용
      setOnlyAccessToken: (token) =>
        set({
          accessToken: token,
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
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
