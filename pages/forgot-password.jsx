import React, {useState} from 'react';
import loadable from '@loadable/component'

import { resetPassword } from '../api/get';

import { alertSuccess, alertError, alertWarning} from '../helper/sweetalert'

const Image = loadable(()=>import('next/image'))
const Header = loadable(()=>import("../components/Head-Component"))
const Link = loadable(()=>import("next/link"))

export default function Forgot(){

  const [email, setEmail] = useState("");  
  const [confirmButton, setconfirmButton] = useState(false);
  const [isFinish, setisFinish] = useState(false);

  const handlerClickSendEmail = async () => {

    if(confirmButton) return

    setconfirmButton(true)
    if(email.length === 0){
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setconfirmButton(false)
      return;
    }
    if(await resetPassword(email)){
      await alertSuccess("Selamat", "Email Konfirmasi Berhasil Di Kirim");      
      setisFinish(true)
    }else{
      await alertError("Something Wrong", "Terjadi kesalahan mohon periksa inputan kamu!");      
      setEmail("");      
    }    
    setconfirmButton(false)
  }

  if(isFinish){
    return(
      <React.Fragment>
        <Header title="Forgot Password Page" description="SC Property Indonesia"></Header>
        <div className="flex flex-col">        
          <div className="flex justify-center min-w-full px-4">
            {/* //box class  */}
            <div className="w-full mt-5 md:rounded-md md:shadow-lg md:w-96">
              <div className="mt-10 mb-12 flex justify-center">
              <div className='flex-row flex'>
                <Link href="/">
                  <Image priority={true} width={47} height={47} src="/logo2.webp" alt="Logo SC Property" />
                </Link>
                <p className='ml-3 mt-2 font-bold text-2xl'>SCProperty</p>
              </div>
              </div>  
              <div className="mb-12">
                <span className="text-lg font-semibold text-gray-600">Email konfirmasi kamu telah berhasil di kirim, silahkan cek email kamu dulu yaa :)</span>
              </div>
              <div className="mt-7 mb-12 flex flex-col">              
              <Link href="/login">
                <button className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-yellow-400">
                  Back to Login              
                </button>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return(
    <React.Fragment>
      <Header title="Forgot Password Page" description="SC Property Indonesia"></Header>
      <div className="flex flex-col">        
        <div className="flex justify-center min-w-full px-4">
          {/* //box class  */}
          <div className="w-full mt-5 md:rounded-md md:shadow-lg md:w-96">
            <div className="mt-10 mb-12 flex justify-center">
            <div className='flex-row flex'>
              <Link href="/">
                <Image priority={true} width={47} height={47} src="/logo2.webp" alt="Logo SC Property" />
              </Link>
              <p className='ml-3 mt-2 font-bold text-2xl'>SCProperty</p>
            </div> 
            </div> 
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Forgot Password</span>              
            </div>
            <div className="my-5 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Email</span>
              <input type="email" value={email} placeholder="Your email" onChange={(e)=>setEmail(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : joni@gadaisyariah.com</span>
            </div>            
            <div className="mt-7 mb-12 flex flex-col">              
              <button onClick={handlerClickSendEmail} className="bg-green-500 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-300">
                {(confirmButton)?"Loading..":"Send Email"}
              </button>
            </div>            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
