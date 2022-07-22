import create from 'zustand';
import {checkUserStatusHandler} from '../api/get'

export const useStatusUser = create(set => ({
  statusUserStore :  -1,
  setStatusUserStore : (status) => set(()=>({statusUserStore:status})),
  checkingFromOnline : async () => {
    const res = await checkUserStatusHandler();
    return set(()=>({statusUserStore:res}))
  }
}));