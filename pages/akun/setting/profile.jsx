import loadable from '@loadable/component'
import { useMemo, useState } from 'react'
import { changePassword, changePIN } from '../../../api/put';
import { alertError, alertWarning, alertSuccess } from '../../../helper/sweetalert'

const Wrapper = loadable(()=>import('../../../components/WrapperProfile'))

export default function SettingProfile(){

  const [pin, setPin] = useState("");
  const [pinConfirmation, setPinConfirmation] = useState("");
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [isClick, setIsClick] = useState(false);

  const [tipeMenu, setTipeMenu] = useState(0);

  const handlerClickPassword = async () => {

    if(isClick) return

    setIsClick(true);

    if (newPassword.length === 0 || passwordConfirmation.length === 0 || oldPassword.length === 0) {
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    const res = await changePassword(newPassword, passwordConfirmation, oldPassword)

    if(res?.status){
      await alertSuccess("Selamat", "Kamu berhasil mengganti Password kamu!");      
    }
    else{
      await alertError("Terjadi Kesalahan", res?.data?.message);      
      setNewPassword("");
      setPasswordConfirmation("");      
      setOldPassword("");
    }
    setIsClick(false);    
    return
  }

    

  const handlerClickPIN = async () => {

    if(isClick) return

    setIsClick(true);

    if (pin.length === 0 || pinConfirmation.length === 0 || password.length === 0) {
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    const resChangePIN = await changePIN(pin, pinConfirmation, password)

    if(resChangePIN?.status){
      await alertSuccess("Selamat", "Kamu berhasil mengganti PIN kamu!");      
    }
    else{
      await alertError("Terjadi Kesalahan", resChangePIN?.data?.message);      
      setPin("");
      setPinConfirmation("");      
      setPassword("");
    }
    setIsClick(false);    
  }

  const renderForm = useMemo(()=>{
    if(tipeMenu === 0){
      return(
        <>
          <p className="text-3xl font-semibold text-gray-800 cursor-pointer">Setting Profile</p>
          <p className="text-sm font-light text-gray-600">Page ini akan memberikan kamu akses untuk mengubah kebutuhan profile</p>
          
          <div onClick={()=>setTipeMenu(1)} className="border-t border-gray-300 pb-1 pt-2 my-5 cursor-pointer">
            <p className="text-gray-800 hover:text-blue-400">Setting Password</p>
            <p className="text-gray-600 text-sm">Rubah dan Tingkatkan keamanan akun dengan Password</p>
          </div>          

          <div onClick={()=>setTipeMenu(2)} className="border-t border-gray-300 pb-1 pt-2 my-5 cursor-pointer">
            <p className="text-gray-800 hover:text-blue-400">Setting PIN</p>
            <p className="text-gray-600 text-sm">Setting Keamanan akun kamu menggunakan PIN</p>
          </div>          
          
        </>
      )
    }else if(tipeMenu === 1){
      return(
        <>
          <p onClick={()=>setTipeMenu(0)} className="text-blue-400 cursor-pointer hover:text-blue-500 mb-5">{`Kembali`}</p>
          <div className="flex justify-between items-center mb-5">
            <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Change Password</span>
          </div>
          <div className="my-2 flex flex-col">
            <span className="font-semibold text-sm text-gray-500 mb-2">New Password</span>
            <input type="password" value={newPassword} placeholder="Your New Password" onChange={(e) => setNewPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
            <span className="text-xs text-gray-400 mt-1 italic">Your Password save with me!</span>
          </div>
          <div className="my-2  flex flex-col">
            <span className="font-semibold text-sm text-gray-500 mb-2">Password Confirmation</span>
            <input type="password" value={passwordConfirmation} placeholder="Your Password Confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
            <span className="text-xs text-gray-400 mt-1 italic"></span>
          </div>
          <div className="my-2  flex flex-col">
            <span className="font-semibold text-sm text-gray-500 mb-2">Old Password</span>
            <input type="password" value={oldPassword} placeholder="Your Old Password" onChange={(e) => setOldPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
            <span className="text-xs text-gray-400 mt-1 italic"></span>
          </div>
          <div className="my-2 flex flex-col">
            <button onClick={handlerClickPassword} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
              {(isClick) ? "Loading.." : "Change Password"}
            </button>
          </div>   
        </>
      )
    }else if(tipeMenu === 2){
      return(
        <>
          <p onClick={()=>setTipeMenu(0)} className="text-blue-400 cursor-pointer hover:text-blue-500 mb-5">{`Kembali`}</p>
           <div className="flex justify-between items-center mb-5">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Change PIN</span>
            </div>
            <div className="my-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">New PIN</span>
              <input type="password" value={pin} placeholder="Your PIN" onChange={(e) => setPin(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Your PIN save with me!</span>
            </div>
            <div className="my-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">PIN Confirmation</span>
              <input type="password" value={pinConfirmation} placeholder="Your PIN Confirmation" onChange={(e) => setPinConfirmation(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Password</span>
              <input type="password" value={password} placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-7 flex flex-col">
              <button onClick={handlerClickPIN} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                {(isClick) ? "Loading.." : "Change PIN"}
              </button>
            </div> 
        </>
      )
    }
  },[tipeMenu, pin, pinConfirmation, password, newPassword, passwordConfirmation, oldPassword, isClick])

  return(
    <Wrapper index={4} title="Page setting Profile" description="Page Setting Profile">      
      {renderForm}
    </Wrapper>
  )
}