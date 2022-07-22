import create from 'zustand';

export const useStoreAkad = create(set => ({
  akad: false,
  confirmed: () => set(() => ({akad:true})),
  rejected: () => set(() => ({akad:false})),
}));