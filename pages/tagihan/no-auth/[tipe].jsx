import React, {useState } from 'react';
import { alertSuccess, alertError, alertWarning, alertQuestion} from '../../../helper/sweetalert';
import loadable from '@loadable/component'
import {noAuthBillPayment,noAuthBill} from '../../../api/post'
import {useStorePayment} from '../../../store/payment-store'
import {FiSearch} from 'react-icons/fi';
import {setNonAuth} from '../../../helper/localStorage'
import { useRouter } from 'next/router';

const Wrapper = loadable(()=>import("../../../components/Wrapper-Component"))
 
 
export default function BillPage() {

  const {push} = useRouter()
  const [search, setSearch] = useState(null);
  const [hp, setHp] = useState(null);
  const [dataGet, setDataGet] = useState(null);  
  const {setPaymentStore} = useStorePayment()
  const [isClick, setIsClick] = useState(false);
   
     
  const HandlerSubmit = async () => {
    let data = await noAuthBill(hp, search)
    if(data?.status){ 
      setNonAuth(JSON.stringify(data?.data?.data?.tagihan))
      push('/tagihan/no-auth/payment-tagihan')
   
    }else{
      await alertError("Terjadi Kesalahan", data?.data?.message);
    }
  }        
 
  
    return (
      <Wrapper index={2} title="My bill - SC Property" description="Page for show list billing SC Property">        
        
        <div className="flex flex-col md:mt-10 mt-4 px-4 md:px-8 lg:px-12 xl:px-14">          
          
          <div className="">
            <p className='text-3xl font-semibold'>Tagihan Properti</p>
            <p className="text-sm text-gray-800 mt-1">Page ini akan menampilkan bill inquiry yang kamu miliki.</p>          
          </div>  
          <div className="flex mt-5">
            <input value={hp} onChange={(e)=>setHp(e.target.value)} type="text" placeholder="Masukan No Hp"  className="w-full p-3 pr-0 border border-gray-400 rounded  text-sm focus:outline-none text-gray-800 hover:border-green-400"/>
          </div>        
          <div className="flex mt-5">
          <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Masukan Id pelanggan anda"  className="w-full p-3 pr-0 border border-gray-400 rounded  text-sm focus:outline-none text-gray-800 hover:border-green-400"/>
          </div>
           
          <button onClick={()=>HandlerSubmit()} className="bg-green-500 mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {dataGet?'Bayar':'Submit'}
          </button>

         
                              
        </div>
      </Wrapper>
   
    )
}
