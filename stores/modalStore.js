import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isPasswordModalVisible: false,
  pendingTab: null, // 이동 시도한 탭 이름
  prevTab: '', // 이전 탭 이름
  showPasswordModal: (tabName, prevTab) =>
    set({
      isPasswordModalVisible: true,
      pendingTab: tabName,
      prevTab,
    }),
  hidePasswordModal: () =>
    set({
      isPasswordModalVisible: false,
      pendingTab: null,
    }),
  // 일단 이건 킾
  //isVerified: false,
  //setVerified: (verified) => set({ isVerified: verified }),
}));
