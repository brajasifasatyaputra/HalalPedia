import React, { useState } from 'react';
import loadable from '@loadable/component'

import { alertSuccess, alertWarning, alertError, alertQuestion } from '../helper/sweetalert'

import { useStoreModal } from '../store/modal-store'

import { changePhoneUser } from '../api/post'

const Header = loadable(()=>import('../components/Head-Component'))

export default function ChangePhoneModal() {

  const { closeModal } = useStoreModal();
    
  const [phone, setPhone] = useState(0);

  const [isClick, setIsClick] = useState(false);

  const handlerClickChangePhone = async () => {

    if(isClick) return

    setIsClick(true);

    if (phone?.toString().length === 0) {
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    if (phone?.toString().length < 10 && phone?.toString().length > 14) {
      await alertWarning("Opppss!!", "Nomor telphone minimal 10 Karakter dan Maksimal 14 Karakter yaa :)");
      setIsClick(false);
      return;
    }

    const resConfirm = await alertQuestion("Confirmation!!", "Apakah kamu yakin ingin menyimpan No Telphone ini?");    

    if(!resConfirm){
      setIsClick(false);
      return;
    }
    
    const res = await changePhoneUser(phone)
    
    if(res){
      await alertSuccess("Selamaaatt", "Kamu berhasil mengganti No Telephone kamu!, Silahkan periksa Whatsapp untuk verifikasi!");      
    }
    else{
      await alertError("Something Wrong", "Terjadi kesalahan mohon periksa kembali inputan kamu!");      
      setPhone("")
    }
    setIsClick(false);
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
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Change No Telphone</span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Nomor Telephone</span>
              <input type="number" value={phone} placeholder="Your New Number" onChange={(e) => setPhone(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Your number phone safe with us!</span>
            </div>           
            <div className="my-7 px-7 flex flex-col">
              <button onClick={handlerClickChangePhone} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                {(isClick) ? "Loading.." : "Change Phone Number"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}