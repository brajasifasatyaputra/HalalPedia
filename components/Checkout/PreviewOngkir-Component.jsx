import React,{useMemo} from 'react'
import { convertToRp} from '../../helper/converter';

import {getTot, getTotQty} from '../../helper/localStorage'

export default function PreviewOngkir({ongkirProps}){  

  const feeDropship = useMemo(()=>{
    const res = getTotQty()
    if(res == null) {
      return 0
    }else{
      if(res==1){
        return 5000
      }else if(res==2||res==3){
        return 4000
      }else if(res>3){
        return 3000
      }
    }
  },[])

  const total = useMemo(()=>{    
    let subtotal = getTot()
    if(subtotal == null){
      subtotal = 0
    }
    let ongkir = ongkirProps?.value?.split("-")[1]
    if(ongkir == null){
      ongkir = 0
    }
    const res = feeDropship + parseInt(subtotal) + parseInt(ongkir)
    return res
  },[ongkirProps, feeDropship])
  
  return(
    <div className="px-2">
      <p className="text-2xl font-semibold">Preview Kalkulasi Pembayaran</p>
      <p className="text-sm text-gray-700 font-extralight">
        Section ini akan menampilkan rincian perhitungan yang akan user bayarkan
      </p>
      <div className="flex justify-between mt-10">
        <p className="font-semibold text-base">Subtotal Keranjang</p>
        <p className="text-sm">{convertToRp(getTot())}</p>
      </div>
      <div className="flex justify-between mt-5">
        <p className=" text-sm">Biaya Kirim Barang</p>
        <p className="text-sm">{convertToRp(ongkirProps?.value?.split("-")[1])}</p>
      </div>
      <div className="flex justify-between mt-5">
        <p className=" text-sm">Biaya Dropship</p>
        <p className="text-sm">{convertToRp(feeDropship)}</p>
      </div>
      <div className="flex justify-between mt-16">
        <p className="text-xl font-semibold">Total Pembayaran</p>
        <p className="text-sm">{convertToRp(total)}</p>
      </div>
    </div>    
  )
}