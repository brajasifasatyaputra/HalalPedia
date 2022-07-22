import create from 'zustand';
import { listStatusGadai } from '../helper/converter';

export const useStoreListGadai = create(set => ({
  listGadaiStore: { value: 'APPROVED', label: 'Berjalan' },
  setStatusListGadaiStore: (item) => {
    const arr = listStatusGadai()
    const res = arr[item]
    return set(()=>({listGadaiStore:res}))
  },  
}));

