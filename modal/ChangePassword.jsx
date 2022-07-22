import React, { useState } from 'react';
import loadable from '@loadable/component'

import { alertSuccess, alertWarning, alertError, alertQuestion } from '../helper/sweetalert'

import { useStoreModal } from '../store/modal-store'

import { changePassword } from '../api/put'

const Header = loadable(()=>import('../components/Head-Component'))

export default function ChangePasswordModal() {

  const { closeModal } = useStoreModal();

  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [isClick, setIsClick] = useState(false);

  const handlerClickPassword = async () => {

    if(isClick) return

    setIsClick(true);

    if (newPassword.length === 0 || passwordConfirmation.length === 0 || oldPassword.length === 0) {
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    const res = await alertQuestion("Confirmation!!", "Apakah kamu yakin ingin mengganti Password?");    

    if(!res){
      setIsClick(false);
      return;
    }

    if(await changePassword(newPassword, passwordConfirmation, oldPassword)){
      await alertSuccess("Selamat", "Kamu berhasil mengganti Password kamu!");      
    }
    else{
      await alertError("Something Wrong", "Terjadi kesalahan mohon periksa kembali inputan kamu!");      
      setNewPassword("");
      setPasswordConfirmation("");      
      setOldPassword("");
    }
    setIsClick(false);
    closeModal();
  }

  return (
    <React.Fragment>
      <Header title="Change Password" description="SC Property Indonesia"></Header>
      <div className="flex flex-col overflow-auto">
        <div className="flex justify-center min-w-full">
          {/* //box class  */}
          <div className="w-full bg-white my-12 md:rounded-md md:shadow-lg md:w-96">
            <div className="flex justify-between items-center px-7 mb-10 mt-5">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Change Password</span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">New Password</span>
              <input type="password" value={newPassword} placeholder="Your New Password" onChange={(e) => setNewPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Your Password save with me!</span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Password Confirmation</span>
              <input type="password" value={passwordConfirmation} placeholder="Your Password Confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Old Password</span>
              <input type="password" value={oldPassword} placeholder="Your Old Password" onChange={(e) => setOldPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-7 px-7 flex flex-col">
              <button onClick={handlerClickPassword} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                {(isClick) ? "Loading.." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}