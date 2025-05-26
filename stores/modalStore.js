import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isPasswordModalVisible: true,
  setPasswordModalVisible: (visible) => set({ isPasswordModalVisible: visible }),
  //isVerified: false,
  //setVerified: (verified) => set({ isVerified: verified }),
}));
