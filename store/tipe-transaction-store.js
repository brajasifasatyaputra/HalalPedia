import create from 'zustand'

export const useTipeTransactionStore = create(set => ({
  tipeTransactionStore: "bayar",
  changeTipeTransactionStore: (tipe) => set(() => ({tipeTransactionStore:tipe}))  
}));


