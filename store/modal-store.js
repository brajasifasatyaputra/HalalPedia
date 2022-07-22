import create from 'zustand';

export const useStoreModal = create(set => ({
  modal: false,
  showModal: () => set(() => ({modal:true})),
  closeModal: () => set(() => ({modal:false})),
}));

export const useTemplateTipeModal = create(set => ({
  tipeModal: "",
  changeTipeModal: (tipe) => set(() => ({tipeModal:tipe}))  
}));


