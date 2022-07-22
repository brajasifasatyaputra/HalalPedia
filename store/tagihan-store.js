import create from 'zustand'

export const tagihanContext = create(set => ({
  tipeTagihanStore : "",
  setTipeTagihanStore : param => set(()=>({tipeTagihanStore:param}))
}))