import create from 'zustand';

export const useStorePhone = create(set => ({
  phoneStore: "",
   
  changePhoneStore: (phone) => set(() => ({phoneStore:phone})),  
  clearPhoneStore: () => set(() => ({phoneStore:"" })),  
}));