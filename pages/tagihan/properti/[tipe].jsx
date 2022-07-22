import React, {useState } from 'react';

import loadable from '@loadable/component'
import Image from 'next/image'
import {getCIDTagihan } from '../../../helper/localStorage'
import {convertToRp } from '../../../helper/converter'
 
import { tagihanPermuhananList} from '../../../api/get';
import {useStorePayment} from '../../../store/payment-store'
 
import { useRouter } from 'next/router';

const Wrapper = loadable(()=>import("../../../components/Wrapper-Component"))
 
const Loading = loadable(()=>import("../../../components/Loading-Component"))
 
export default function BillPage() {

  const {push} = useRouter()
  const [tipeProperti, setTipeProperti] = useState(null);
  
  const {resTagihan,notFound,loadingTagihan} = tagihanPermuhananList(getCIDTagihan());
  const {setPaymentStore} = useStorePayment()
  const [isClick, setIsClick] = useState(false);
   
     
   
    

  const handlerAtClick = async (e) => {
    setPaymentStore(e)
    push('/tagihan/properti/payment-tagihan')
  }

   

  if(loadingTagihan){
    return(
      <Loading></Loading>
    )    
 
  }else{

  
    return (
      <Wrapper index={2} title="My bill - SC Property" description="Page for show list billing SC Property">        
       {resTagihan.length === 0||resTagihan===null?
          <p className='text-center text-3xl mt-20'>Coming Soon </p>:
        <div className="flex flex-col md:mt-10 mt-4 px-4 md:px-8 lg:px-12 xl:px-14">          
          
          <div className="">
            <p className='text-3xl font-semibold'>Tagihan Properti</p>
            <p className="text-sm text-gray-800 mt-1">Page ini akan menampilkan bill inquiry yang kamu miliki.</p>          
          </div>          
          
          <div className=" grid gap-4 md:grid-cols-3 grid-cols-1 mt-5">
          {
          resTagihan?.map((e,i)=>(
          <div   key={i}>
          <div onClick={()=>{setTipeProperti(e); }} className={`${e===tipeProperti?'bg-yellow-200':null} flex border-2 p-3 rounded-xl space-x-4 cursor-pointer`}>
            <div>
              <Image className=" rounded-full" src={e?.image_url} alt="Logo Properti" width={50} height={50}></Image>
            </div>
            <div className='flex flex-col'>
              <p className="text-gray-800 font-medium md:mt-2 md:text-lg">{e?.unit_pelanggan} ({e?.produk})</p>
              <p className="text-gray-800 font-medium md:mt-2 md:text-lg">{convertToRp(e?.totalAmount)}</p>
            
            </div>
          </div>  
          {tipeProperti === e?(
            <>
           
          <div className="border w-full border-gray-100 mt-2 mb-10"></div>
          <div className="w-full px-2">
            <div className="">
              <div>
                <p className="text-gray-800 font-semibold text-xl">Form Tagihan</p>                
              </div>
              <p className="text-blue-400 text-sm">{tipeProperti.unit_pelanggan} ({tipeProperti.produk})</p>
            </div>
            <div className='flex border-b-2 border-gray-150 flex-row w-full justify-between'>
              <p className="text-green-400 font-semibold mt-5 text-sm">Id Pelanggan</p>
              <p className="text-gray-800 font-semibold mt-5 text-sm">{tipeProperti.idpel}</p>
              {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
            </div>
            <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
              <p className="text-green-400 font-semibold mt-5 text-sm">Angsuran</p>
              <p className="text-gray-800 font-semibold mt-5 text-sm">ke - {tipeProperti.periode?tipeProperti.periode:0}</p>
              {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
            </div>
            <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
              <p className="text-green-400 font-semibold mt-5 text-sm">Nama Pelanggan</p>
              <p className="text-gray-800 font-semibold mt-5 text-sm">{tipeProperti.nama_pelanggan}</p>
              {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
            </div>
            
            <div className='flex border-b-2 border-gray-150  flex-row w-full justify-between'>
              <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
              <p className="text-gray-800 font-semibold mt-5 text-sm">{convertToRp(tipeProperti?.totalAmount)}</p>
              {/* <p className="text-gray-800 text-lg">{tipeProperti.idpel}</p> */}
            </div>
    
            <button onClick={()=>handlerAtClick(e)} className="mt-2 w-full py-2 px-1 rounded bg-green-400 hover:bg-green-500 cursor-pointer text-white font-semibold">
              { "Bayar"}
            </button>
          </div>
          </>
          ):null}      
          </div>
        ))}   
           
          </div>

         
                              
        </div>}
      </Wrapper>
    )
  }
}
