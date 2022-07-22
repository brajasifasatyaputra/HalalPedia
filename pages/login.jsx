import React, {useState} from 'react';
import loadable from '@loadable/component'

import Link from 'next/link'
import { login } from '../api/post';
import { checkUserStatusHandler,getAsset } from '../api/get'
import { useRouter } from 'next/router';

import { alertSuccess, alertError, alertWarning, alertInfo} from '../helper/sweetalert'

import {useStoreAuth} from '../store/auth-store';
import {useStatusUser} from '../store/status-store'
import { BASE_URL } from '../helper/axios';

// import {FcGoogle} from 'react-icons/fc'
import {FaGoogle} from 'react-icons/fa'
import { getUserLogin, setStatusUser } from '../helper/localStorage';

const Image = loadable(()=>import('next/image'))
const Header = loadable(()=>import("../components/Head-Component"));

export default function Login(){

  const {loginConfirm} = useStoreAuth();

  const {setStatusUserStore} = useStatusUser()

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isClick, setIsClick] = useState(false);

  const handlerClickLoginWithGoogle = async () => {
    if(typeof window === 'undefined')  return;
    window.location.href = `${BASE_URL}/google`    
  }

  const handlerClickLogin = async () => {
    
    if(isClick){
      return
    }

    setIsClick(true);
    
    if(email?.length === 0){
      await alertWarning("Opppss!!", "Mohon lengkapi form Email terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    if(password.length === 0){
      await alertWarning("Opppss!!", "Mohon lengkapi form Password terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }
    
    const res = await login(email, password)  

    if(!res.status){                
      await alertError("Terjadi Kesalahan", res?.data?.message);
      setEmail("");
      setPassword("");
      setIsClick(false);
      return; 
    }
  
    let staCheckingUser = true;    

    const statusCheck = await checkUserStatusHandler();
    const _  = await getAsset();
    if(statusCheck === 1){
      staCheckingUser = false
      await alertError("Email not Verfied", "Mohon maaf namun untuk dapat masuk kamu harus verifikasi email kamu terlebih dahulu");
      setIsClick(false);
      return;
    }
    else if(statusCheck === 5){
      staCheckingUser = false
      await alertError("Akun Suspend", "Mohon maaf akun kamu terkena suspend, untuk lebih lanjut silahkan hubungi customer service");
      setIsClick(false);
      return;
    }
    else if(statusCheck === 6){
      staCheckingUser = false
      await alertError("Akun Banned", "Mohon maaf akun kamu terkena banned, untuk lebih lanjut silahkan hubungi customer service");
      setIsClick(false);
      return;
    }    

    if(res.status && staCheckingUser){    
      loginConfirm();
      setStatusUser(JSON.stringify(statusCheck))
      setStatusUserStore(statusCheck)  
      await alertSuccess("Login Berhasil", `Selamat datang ${getUserLogin().toUpperCase()} Kamu berhasil login!`);            
      setIsClick(false);      
      router.push("/")
      return
    }    

  }

  return(
    <React.Fragment>
      <Header title="Login Page" description="SC Property Indonesia"></Header>
      <div className="flex flex-col">        
        <div className="flex justify-center min-w-full px-5">
          {/* //box class  */}
          <div className="w-full my-12 md:w-1/2 lg:rounded-md lg:shadow-lg xl:w-1/3">
            <div className="mt-10 mb-12 flex justify-center cursor-pointer">
              <Link href="/">
              <div className='flex-row flex'>
                      <Image priority={true} width={47} height={47} src="/logo2.webp" alt="Logo SC Property" />
                      <p className='ml-3 mt-2 font-bold text-2xl'>SCProperty</p>
                    </div>
              </Link>
            </div>  
            <div className="flex justify-between items-center md:px-7 px-2 mb-10">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Masuk</span>
              <span className="text-sm text-green-500 cursor-pointer"><Link href="/register">Daftar</Link></span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Email</span>
              <input type="email" value={email} placeholder="Your email" onChange={(e)=>setEmail(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : joni@gadaisyariah.com</span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Password</span>
              <input type="password" value={password} placeholder="Your password" onChange={(e)=>setPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="mt-7 md:px-7 px-2 flex flex-col">
              <div className="flex justify-end">
                <span className="text-sm text-blue-400 mb-1 cursor-pointer"><Link href="/forgot-password">Lupa kata sandi?</Link></span>
              </div>
              <button onClick={handlerClickLogin} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                {(isClick)?"Loading..":"Masuk"}
              </button>
            </div>
            <div className="my-4 flex justify-center">
              <span className="text-xs text-gray-400">Atau masuk dengan</span>
            </div>
            <div className="md:px-7 px-2 flex flex-col">              
              <button onClick={handlerClickLoginWithGoogle} className="bg-white text-blue-400 font-bold border-opacity-50 border-blue-400 border-2 py-3 cursor-pointer rounded-md hover:bg-blue-400 hover:text-white">
                <div className="flex justify-center justify-items-center">                  
                  <FaGoogle size={22}></FaGoogle>
                  <span className="pl-2">Login with Google</span>
                </div>
              </button>
            </div>
            <div className="mt-2 mb-7 flex justify-center">
              <span className="text-xs text-gray-400">Belum punya akun?</span><span className="ml-2 text-xs text-blue-400 cursor-pointer"><Link href="/register" >Daftar Sekarang</Link></span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}