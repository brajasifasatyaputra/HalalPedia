import React, {useState, useEffect} from 'react';

import loadable from '@loadable/component'
 
import { getUserWadiah} from '../../../helper/localStorage'
import {convertToRp, listChooseBankForRetail} from '../../../helper/converter'
import {alertError, alertSuccess, alertWarning} from '../../../helper/sweetalert'
 
import { useStorePIN } from '../../../store/pin-store';
import { useStoreModal, useTemplateTipeModal } from '../../../store/modal-store';
import { paymentHandlerForMyBill } from '../../../api/post';
import { useRouter } from 'next/router';
import {useStorePayment} from '../../../store/payment-store'
const Wrapper = loadable(()=>import("../../../components/Wrapper-Component"))
 
const Select = loadable(()=>import('react-select'))
const Loading = loadable(()=>import("../../../components/Loading-Component"))
 
export default function BillPage() {

  const {push} = useRouter()


  const [bank, setBank] = useState([]);
   
  const {pinStore, confirmPIN, clearPINStore} = useStorePIN()
  const {showModal, modal} = useStoreModal()
  const {changeTipeModal} = useTemplateTipeModal()

  const [isClick, setIsClick] = useState(false);
   
  const {paymentStore} = useStorePayment()
    
  const handlerPayment = async () => {

    setIsClick(true)
    
    const res = await paymentHandlerForMyBill(paymentStore.totalAmount, paymentStore.idpel, pinStore, bank?.value)
    
    if(!res?.status){
      await alertError("Terjadi Kesalahan", res?.data?.message)
      setIsClick(false)
      clearPINStore()
      return
    }

    clearPINStore()
    setIsClick(false)
    await alertSuccess("Berhasil", "Kamu Berhasil melakukan pembayaran!")
    push("/inbox")
    return

  }  

  useEffect(()=>{
    if(!modal){
      setIsClick(false)
    }
  },[modal])

  useEffect(()=>{
    if(confirmPIN){
      handlerPayment()
    }   
  },[confirmPIN])

  const handlerAtClick = async () => {
    
    if(isClick) return

    setIsClick(true)

    if(bank?.value == null){
      alertWarning("OOppps", "mohon pilih metode pembayaran terlebih dahulu yaa")
      setIsClick(false)
      return
    }

    changeTipeModal("pin")
    showModal()    

  }

  

  
    return (
      <Wrapper index={2} title="My bill - SC Property" description="Page for show list billing SC Property">        
       
       <div className="flex flex-col md:mt-7 mt-4 md:px-14 px-5">
        <div>
          <span className="text-3xl font-semibold mb-2">Pilih Metode Pembayaran</span>
        </div>
        <span className="text-sm mb-7">Pilih metode pembayaran tagihan anda  </span>        
      </div>
      <div className="md:px-14 px-5 pb-10"> 
      <>
           
           <div className="border w-full border-gray-100 mt-2 mb-10"></div>
           <div className="w-full px-2">
            
     
             
             <Select options={listChooseBankForRetail()} value={bank} onChange={(e)=>setBank(e)}></Select>
           { bank.length===0?null: 
           <>
             <div className='mt-3'>
                 <p className="text-gray-800 font-semibold text-lg">Ringkasan Pembayaran</p>                
               </div>
              
             {bank?.value==='WADIAH'?
               <div className=' mb-3'>
             <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
               <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
               <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(paymentStore?.totalAmount)}</p>
               {/* <p className="text-gray-800 text-lg">{paymentStore.idpel}</p> */}
             </div>
             <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
               <p className="text-green-400 font-semibold mt-5 text-sm">Total Saldo Anda</p>
               <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(getUserWadiah())}</p>
               {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
             </div>
             <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
               <p className="text-green-400 font-semibold mt-5 text-sm">Sisa Saldo Anda</p>
               <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(getUserWadiah()-paymentStore?.totalAmount)}</p>
               {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
             </div>
               
              
             </div>:bank?.value?.split('_')[0]==='VA'?
              <div className='mt-3 mb-3'>
              <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
                <p className="text-green-400 font-semibold mt-5 text-sm">Tagihan</p>
                <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(paymentStore?.totalAmount)}</p>
                {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
              </div>
              <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
                <p className="text-green-400 font-semibold mt-5 text-sm">Biaya Virtual Account</p>
                <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(5000)}</p>
                {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
              </div>
              <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
                <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
                <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(paymentStore?.totalAmount+5000)}</p>
                {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
              </div>
                
               
              </div>
           :  bank?.value ==='ALFAMART'||bank?.value ==='INDOMARET'?
           <div className='mt-3 mb-3'>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Tagihan</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(paymentStore?.totalAmount)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Biaya Admin</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(5000)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(paymentStore?.totalAmount+5000)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
             
            
           </div>:
           <div className='mt-3 mb-3'>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Tagihan</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(paymentStore?.totalAmount)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Biaya Lain</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(0)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(paymentStore?.totalAmount+0)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
             
            
           </div>}
 
           
             <button onClick={handlerAtClick} className="mt-2 w-full py-2 px-1 rounded bg-green-400 hover:bg-green-500 cursor-pointer text-white font-semibold">
               {(isClick)?"Loading..":"Bayar Tagihan"}
             </button>
             </>
            }
           </div>
           </>
     </div>
          
              
        
      </Wrapper>
    )
  
}
