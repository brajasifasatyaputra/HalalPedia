import React, {useState, useEffect} from 'react';

import loadable from '@loadable/component'
import {noAuthBillPayment,noAuthBill} from '../../../api/post'
import { getNonAuth,setPayment} from '../../../helper/localStorage'
import {convertToRp, listChooseBankForRetail, listChooseBankTopup} from '../../../helper/converter'
import {alertError, alertSuccess, alertWarning} from '../../../helper/sweetalert'
 
 
import {useStorePayment} from '../../../store/payment-store'
 
import { useRouter } from 'next/router';
const Wrapper = loadable(()=>import("../../../components/Wrapper-Component"))
 
const Select = loadable(()=>import('react-select'))
const Loading = loadable(()=>import("../../../components/Loading-Component"))
 
export default function BillPage() {

  const {push} = useRouter()
  const datas = JSON.parse(getNonAuth())

  const [bank, setBank] = useState([]);
  const {paymentStore} = useStorePayment()
 

  const [isClick, setIsClick] = useState(false);  
    
    

  const handlerAtClick = async () => {
    
    let data = await noAuthBillPayment(bank?.value, datas.user_transaction_id)
    if(data?.status){ 
      setPayment(JSON.stringify(data?.data?.data))
      await alertSuccess("Berhasil", "Kamu Berhasil melakukan transaksi!")
      push('/tagihan/no-auth/invoice')
   
    }else{
      await alertError("Terjadi Kesalahan", data?.data?.message);
    }  

  }  
  
    return (
      <Wrapper title="My bill - SC Property" description="Page for show list billing SC Property">        
       
       <div className="flex flex-col md:mt-7 mt-4 md:px-14 px-5">
        
        <div>
          <span className="text-3xl font-semibold mb-2">Pilih Metode Pembayaran</span>
        </div>
        <span className="text-sm mb-7">Pilih metode pembayaran tagihan anda  </span>        
      </div>
      <div className="md:px-14 px-5 pb-10"> 
      <HasilKalkulasi datax={datas}i></HasilKalkulasi>
      <>
           
           <div className="border w-full border-gray-100 mt-2 mb-10"></div>
           <div className="w-full px-2">
            
     
             
             <Select options={listChooseBankTopup()} value={bank} onChange={(e)=>setBank(e)}></Select>
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
                <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(7000)}</p>
                {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
              </div>
              <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
                <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
                <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(paymentStore?.totalAmount+7000)}</p>
                {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
              </div>
                
               
              </div>
           :  bank?.value ==='ALFAMART'||bank?.value ==='INDOMARET'?
           <div className='mt-3 mb-3'>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Tagihan</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(datas?.totalAmount)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Biaya Admin</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(7000)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(datas?.totalAmount+7000)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
             
            
           </div>:
           <div className='mt-3 mb-3'>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Tagihan</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(datas?.totalAmount)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Biaya Lain</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(0)}</p>
             {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
           </div>
           <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
             <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
             <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(datas?.totalAmount+0)}</p>
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

function HasilKalkulasi({datax}){

 
 
  return(
    <div className="w-full rounded px-2 py-4 bg-gray-100 my-5">
      <p className="text-2xl font-semibold">   Pembayaran CID-{datax?.cid}</p> 
      <div className="md:flex md:justify-between mt-5">
        <p className="text-blue-400 text-xl font-light"></p> 
        {/* <p className="text-blue-400 font-semibold text-xl">{convertToRp(data?.amount_financing-data?.amount_cost_administration)}</p> */}
      </div>
      <div className="md:flex md:justify-between mt-2">
        <p className="text-gray-800 text-sm font-light">Kode Biling</p> 
        <p className="text-gray-800 font-semibold text-sm">{datax?.billingCode}</p>
      </div>
      <div className="md:flex md:justify-between mt-2">
        <p className="text-gray-800 text-sm font-light">Jenis</p> 
        <p className="text-gray-800 font-semibold text-sm">{datax?.jenisProduk}</p>
      </div>
      <div className="md:flex md:justify-between mt-2">
        <p className="text-gray-800 text-sm font-light">Periode Ke</p> 
        <p className="text-gray-800 font-semibold text-sm">{datax?.billingPeriod}</p>
      </div>
      <div className="md:flex md:justify-between mt-2">
        <p className="text-gray-800 text-sm font-light">Deskripsi</p> 
        <p className="text-gray-800 font-semibold text-sm">{datax?.description}</p>
      </div>
      <div className="md:flex md:justify-between mt-2">
        <p className="text-gray-800 text-sm font-light">Total Tagihan </p> 
        <p className="text-gray-800 font-semibold text-sm">{convertToRp(datax?.totalAmount)}</p>
      </div>
    </div>
  )
}