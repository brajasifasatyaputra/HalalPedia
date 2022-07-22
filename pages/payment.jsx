import React, { useEffect, useMemo, useState  }  from 'react';
import loadable from '@loadable/component'
import {createPayment} from '../api/post';
import {getAsset} from '../api/get';
import {listChooseBank,listChooseBankTopup,convertToRp,listChooseBankMarket} from '../helper/converter';
import {useRouter} from 'next/router';
import {useDataPawnStore} from '../store/detail-pawn-store'
import {alertSuccess, alertError, alertQuestion } from '../helper/sweetalert'
import {useTipeTransactionStore} from '../store/tipe-transaction-store'
import {useStoreModal, useTemplateTipeModal} from '../store/modal-store';
import {useStorePIN} from '../store/pin-store'
import { getTotTrx,getTrxId} from '../helper/localStorage'

const Select = loadable(()=>import('react-select'))
const Wrapper  = loadable(()=>import("../components/Wrapper-Component"));

export default function Payment() {

  const {showModal} = useStoreModal();
  const {changeTipeModal} = useTemplateTipeModal();
  const {pinStore, clearPINStore, confirmPIN} = useStorePIN();

  const handlerOpenModalPIN = () =>{    
    changeTipeModal("pin");
    showModal();
  }

  const {tipeTransactionStore} = useTipeTransactionStore();
  const {dataDetailPawnStore} = useDataPawnStore();
  
  const router = useRouter()    
  const [type, setType] = useState('');

  const [isClick, setIsClick] = useState(false);  

  const tipeTrans = useMemo(()=>{
    if(tipeTransactionStore === "bayar"||tipeTransactionStore === "topup") return "Apakah kamu yakin ingin melanjutkan pembayaran?";
    else if(tipeTransactionStore === "perpanjangan") return "Apakah kamu yakin ingin perpanjang gadai ini?"
  },[tipeTransactionStore])

  const handlerTransactionAfterPin = async () => {
    const res = await alertQuestion("Confirmation!!",`${tipeTrans}`, "Yes!");    
    if(!res){
      setIsClick(false);  
      return;
    }  
    const resPayment = await createPayment(dataDetailPawnStore?.user_transaction_id==null?getTrxId():dataDetailPawnStore?.user_transaction_id,type.value,pinStore) 
    if(resPayment.kondisi){
      await alertSuccess("Transaksi Berhasil", "Silahkan lakukan pembayaran, pembayaran dapat dilihat di inbox atau logo lonceng di pojok kanan atas.");
      await getAsset()
      clearPINStore()
      setIsClick(false)
      if(type?.label === "SALDO"){
        router.push("/inbox")
        return
      }
      router.push('/inbox')
      return
    }else{
      await alertError("Transaksi anda gagal", resPayment?.res?.data?.message);
      clearPINStore()
      setIsClick(false)
      //router.push('/gadai')
    }
  }

  const staButton = useMemo(()=>{
    if(type !== ""){
      return false
    }
    return true
  },[type])

  useEffect(()=>{
    if(confirmPIN){
      handlerTransactionAfterPin();
    }
  },[confirmPIN])

  const handlerClickPayment = () =>{    
    setIsClick(true);        
    if(type.length === 0){
      setIsClick(false);  
      return;
    }
    handlerOpenModalPIN();    
  }

  const listOption = useMemo(()=>{
    if(tipeTransactionStore === "topup"){
      return listChooseBankTopup()
    }
    else if(tipeTransactionStore === "market" ){
      return listChooseBankMarket()
    }
    else{
      listChooseBank()
    }
  },[tipeTransactionStore])

  return (    
    <Wrapper title="Payment Page - SC Property" description="Page for create payment and add to list pending inbox">
      <div className="flex flex-col md:mt-7 mt-4 md:px-14 px-5">
        <div>
          <span className="text-3xl font-semibold mb-2">Pilih Metode Pembayaran</span>
        </div>
        <span className="text-sm mb-7">Form ini akan menampilkan metode pembayaran </span>        
      </div>
      <div className="md:px-14 px-5 pb-10"> 
        <div className="flex justify-between mb-2 pb-2">
          <div>{(tipeTransactionStore === "bayar"||tipeTransactionStore==="topup"||tipeTransactionStore==="market")?"Total Tagihan":"Bayar Perpanjang"}</div>
          {(tipeTransactionStore == "bayar")?(
            <div className="text-right font-medium">{convertToRp(dataDetailPawnStore?.amount==null?getTotTrx():dataDetailPawnStore?.amount)}</div>
          ):(
            <div className="text-right font-medium">{convertToRp(dataDetailPawnStore?.amount)}</div>
          )}
        </div>      
        <div className="mb-2 text-xs italic text-red-400">*Biaya admin akan ditambahkan ketika rekening bank berbeda</div>
        <Select
          className=""
          value={type}
          placeholder="Pilih Bank"
          onChange={(value) => setType(value)}
          options={listOption}
        />
        <div className="py-3">
          <button disabled={staButton} onClick={handlerClickPayment} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            {(isClick)?"Loading..":"Bayar Sekarang"}
          </button>
        </div>
     </div>
   
    </Wrapper>          
  )
}
