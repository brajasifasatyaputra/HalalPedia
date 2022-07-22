import React, { useState } from 'react';
import loadable from '@loadable/component'

import {useRouter} from 'next/router'

import { alertSuccess, alertWarning, alertError, alertQuestion } from '../helper/sweetalert'

import { useStoreModal } from '../store/modal-store'

import { createTransactionTopup } from '../api/post'

import {useDataPawnStore } from '../store/detail-pawn-store';
import {useTipeTransactionStore} from '../store/tipe-transaction-store';

const Header = loadable(()=>import('../components/Head-Component'))

export default function ChangePhoneModal() {

  const router = useRouter()

  const { closeModal } = useStoreModal();
  const {changeTipeTransactionStore} = useTipeTransactionStore();
  const {changeDataDetailPawn} = useDataPawnStore();  

  const [topup, setTopup] = useState(0);

  const [isClick, setIsClick] = useState(false);

  const handlerClickTopUp = async () => {

    if(isClick) return

    setIsClick(true);

    if (topup?.toString().length === 0) {
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    if (parseInt(topup) < 10000) {
      await alertWarning("Opppss!!", "Minimal topup Rp.10.000");
      setIsClick(false);
      return;
    }

    const resConfirm = await alertQuestion("Confirmation!!", "Apakah kamu yakin ingin Topup saldo ini?","yes");    

    if(!resConfirm){
      setIsClick(false);
      return;
    }
    
    const res = await createTransactionTopup(topup)
    
    if(res){
      changeDataDetailPawn(res);
      changeTipeTransactionStore("topup");
      await alertSuccess("Terimakasih", "Silahkan pilih bank pembayaran!");                
    }
    else{
      await alertError("Something Wrong", "Terjadi kesalahan mohon periksa kembali inputan kamu!");      
      setPhone("")
    }
    setIsClick(false);
    router.push("/payment")
    closeModal();    
  }

  return (
    <React.Fragment>
      <Header title="Change Phone" description="SC Property Indonesia"></Header>
      <div className="flex flex-col overflow-auto">
        <div className="flex justify-center min-w-full">
          {/* //box class  */}
          <div className="w-full bg-white my-12 md:rounded-md md:shadow-lg md:w-96">
            <div className="flex justify-between items-center px-7 mb-10 mt-5">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Topup Saldo</span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Saldo topup</span>
              <input type="number" value={topup} placeholder="Masukan saldo yang ingin di topup" onChange={(e) => setTopup(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>           
            <div className="my-7 px-7 flex flex-col">
              <button onClick={handlerClickTopUp} className="bg-green-400 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-500">
                {(isClick) ? "Loading.." : "Topup Sekarang!"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}