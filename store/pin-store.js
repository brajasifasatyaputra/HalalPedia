import create from 'zustand';

export const useStorePIN = create(set => ({
  pinStore: "",
  confirmPIN:false,
  changePINStore: (pin) => set(() => ({pinStore:pin, confirmPIN:true})),  
  clearPINStore: () => set(() => ({pinStore:"", confirmPIN:false})),  
}));