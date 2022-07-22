export const listFilterInboxTransaction = () => {
  return[
    {
      label : "Transaksi Selesai",
      value: "DONE"
    },
    {
      label : "Transaksi Belum Selesai",
      value: "PENDING"
    }
  ]
}

export const listFiturMenuLain = () => {
  return [
    {
      label: 'Tagihan Listrik',
      value: 1
    },    
    {
      label: 'Paket Internet',
      value: 2
    },
  ]
}