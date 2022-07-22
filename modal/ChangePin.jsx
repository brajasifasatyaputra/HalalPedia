import React, { useState } from 'react';
import loadable from '@loadable/component'

import { alertSuccess, alertWarning, alertError, alertQuestion } from '../helper/sweetalert'

import { useStoreModal } from '../store/modal-store'

import { changePIN } from '../api/put'

const Header = loadable(()=>import('../components/Head-Component'))

export default function ChangePinModal() {

  const { closeModal } = useStoreModal();

  const [pin, setPin] = useState("");
  const [pinConfirmation, setPinConfirmation] = useState("");
  const [password, setPassword] = useState("");

  const [isClick, setIsClick] = useState(false);

  const handlerClickPIN = async () => {

    if(isClick) return

    setIsClick(true);

    if (pin.length === 0 || pinConfirmation.length === 0 || password.length === 0) {
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    const res = await alertQuestion("Confirmation!!", "Apakah kamu yakin ingin mengganti PIN?");    

    if(!res){
      setIsClick(false);
      return;
    }

    if(await changePIN(pin, pinConfirmation, password)){
      await alertSuccess("Selamat", "Kamu berhasil mengganti PIN kamu!");      
    }
    else{
      await alertError("Something Wrong", "Terjadi kesalahan mohon periksa kembali inputan kamu!");      
      setPin("");
      setPinConfirmation("");      
      setPassword("");
    }
    setIsClick(false);
    closeModal();
  }

  return (
    <React.Fragment>
      <Header title="Change PIN" description="SC Property Indonesia"></Header>
      <div className="flex flex-col overflow-auto">
        <div className="flex justify-center min-w-full">
          {/* //box class  */}
          <div className="w-full bg-white my-12 md:rounded-md md:shadow-lg md:w-96">
            <div className="flex justify-between items-center px-7 mb-10 mt-5">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Change PIN</span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">New PIN</span>
              <input type="password" value={pin} placeholder="Your PIN" onChange={(e) => setPin(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Your PIN save with me!</span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">PIN Confirmation</span>
              <input type="password" value={pinConfirmation} placeholder="Your PIN Confirmation" onChange={(e) => setPinConfirmation(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Password</span>
              <input type="password" value={password} placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-7 px-7 flex flex-col">
              <button onClick={handlerClickPIN} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                {(isClick) ? "Loading.." : "Change PIN"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}