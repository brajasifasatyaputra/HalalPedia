import React,{useEffect, useMemo, useState} from 'react'
import loadable from '@loadable/component'

import {useRouter} from 'next/router'

import {useAlamatUser} from '../../api/get'
import {getJasaKirim, createTransactionRetail} from '../../api/post'

import {getTotQty, getTot} from '../../helper/localStorage'

import {useDataPawnStore } from '../../store/detail-pawn-store';
import {useTipeTransactionStore} from '../../store/tipe-transaction-store';

const Select = loadable(()=>import("react-select"))
const Loading = loadable(()=>import("../../components/Loading-Component"))

export default function PilihAlamat({label, setStatusTampil, statusTampil, setAlamatProps, setOngkirProps}){  
  
  label = (label||"Pilih Alamat")

  const router = useRouter()

  const {changeTipeTransactionStore} = useTipeTransactionStore();
  const {changeDataDetailPawn} = useDataPawnStore();  

  const [alamat, setAlamat] = useState("");
  const [ongkir, setOngkir] = useState("");  
  
  const [feeDropship, setFeeDropship] = useState(0);

  const {resAlamatUser, loadingAlamatUser} = useAlamatUser()

  const [isLoading, setisLoading] = useState(false);
  
  const [listOngkir, setListOngkir] = useState([]);  

  useEffect(()=>{
    const res = getTotQty()
    if(res == null) {
      setFeeDropship(0)
    }else{
      if(res==1){
        setFeeDropship(5000)
      }else if(res==2||res==3){
        setFeeDropship(4000)
      }else if(res>3){
        setFeeDropship(3000)
      }
    }
  },[])

  const staOngkir = useMemo(()=>{
    if(alamat !== ""){
      return false
    }
    return true
  },[alamat])

  const staButton = useMemo(()=>{
    if(ongkir !== ""){
      return false
    }
    return true
  },[ongkir])

  const handlerBayarSekarang = async () => {  
    if(isLoading){
      return
    }
    setisLoading(true)  
    const splitValue = ongkir?.value?.split("-")
    const splitLabel = ongkir?.label?.split("-")
    const res = await createTransactionRetail((parseInt(getTot())+feeDropship+(parseInt(splitValue[1]))), alamat?.value, splitValue[0], parseInt(splitValue[1]), feeDropship, splitLabel[1])
    if(res == null){
      setisLoading(false)      
      return
    }
    else{
      changeDataDetailPawn(res);
      changeTipeTransactionStore("market");
      setisLoading(false)
      router.push("/payment")
      return
    }
  }

  useEffect(()=>{        
    if(alamat != null){
      (async()=>{
        const res = await getJasaKirim(alamat?.value)
        if(res == ""){
          setListOngkir([])        
        }else{
          setListOngkir(res)
        }        
      })()
    }
  },[alamat])
  
  if(loadingAlamatUser){
    return(
      <>
        <Loading></Loading>
      </>
    )
  }
  else{
    return(
      <>
        <div className="mt-10">           
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <div className="flex">
            <div className="w-10/12 md:w-11/12">
              <Select                     
                options={resAlamatUser}
                onChange={(value)=>{setAlamat(value);}}
                value={alamat}
                placeholder=""
              ></Select>
            </div>
            <div className="w-2/12 md:w-1/12">
              <div className="ml-1">                
                <button onClick={()=>setStatusTampil(!statusTampil)} className="text-center w-full rounded text-blue-500 border-2 border-blue-300 py-1">
                  +
                </button>              
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">  
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Jasa Kirim
          </label>
          <Select
            isDisabled={staOngkir}
            value={ongkir}
            placeholder=""
            onChange={(value)=>{setOngkir(value);setOngkirProps(value)}}
            options={listOngkir}                      
          />                  
        </div>        
        {(statusTampil)?null:(
          <button disabled={staButton} onClick={handlerBayarSekarang} className="w-full mt-5 bg-yellow-400 text-white py-3 hover:bg-yellow-300 rounded font-semibold">
            {(isLoading)?"Loading..":"Pilih Metode Pembayaran"}
          </button>                              
        )}
      </div>
      </>
    )
  }

}