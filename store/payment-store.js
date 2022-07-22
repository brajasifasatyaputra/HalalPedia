import create from 'zustand';

export const useStorePayment = create(set => ({
  paymentStore: "",
   
  setPaymentStore: (data) => set(() => ({paymentStore:data})),  

}));