import create from 'zustand';

export const useDetailPawnStore = create(set => ({
  idDetailPawnStore: "1",  
  changeIdDetailPawn: (param) => set(() => ({idDetailPawnStore:param}))     
}));

export const useDataPawnStore = create(set => ({  
  dataDetailPawnStore: null,       
  changeDataDetailPawn: (params) => set(() => ({dataDetailPawnStore:params})),         
}));