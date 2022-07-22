import create from 'zustand';

export const useStoreAuth = create(set => ({
  authStore: false,
  loginConfirm: () => set(() => ({authStore:true})),
  logoutConfirm: () => set(() => ({authStore:false})),
}));