import React, {useState} from 'react';
import loadable from '@loadable/component'
import Link from 'next/link'
import {MdClose} from 'react-icons/md'

import { register } from '../api/post';

import { alertSuccess, alertError, alertWarning, alertInfo} from '../helper/sweetalert'

const Image = loadable(()=>import('next/image'))
const Header = loadable(()=>import("../components/Head-Component"))

export default function Register(){

  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [numberTelp, setNumberTelp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [staAlertPassword, setstaAlertPassword] = useState(true);

  const [isClck, setIsClck] = useState(false);  

  const handlerClickRegister = async () => {

    if(isClck){
      return
    }

    setIsClck(true);

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

    if(numberTelp?.length === 0){
      await alertWarning("Opppss!!", "Mohon lengkapi form Nomor Telphone terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    if(!(numberTelp?.length >= 10 && numberTelp?.length <= 14)){
      await alertWarning("Opppss!!", "Nomor Telphone Min 10 dan Max 14 karakter yaa :)");
      setIsClck(false);
      return;
    }
    if(password !== passwordConfirm){
      await alertWarning("Opppss!!", "Password dan Password Confirmation berbeda!");
      setIsClck(false);
      return;
    }
    
    const staRegis = await register(name,email, password, passwordConfirm, numberTelp,ref)

    if(staRegis.kondisi){
      await alertSuccess("Selamat!!", "Akun kamu berhasil Terdaftar!");            
      await alertInfo("Verifikasi Email", "Verifikasi email telah di kirim "+email);      
    }else{
      await alertError("Something Wrong", staRegis?.res?.data?.message);
      setName("");
      setEmail("");
      setNumberTelp("")
      setPassword("");
      setPasswordConfirm("");
    }
    setIsClck(false);
  }

  return(
    <React.Fragment>
      <Header title="Register Page" description="SC Property Indonesia"></Header>
      <div className="flex flex-col">        
        <div className="flex justify-center min-w-full px-5">
          {/* //box class  */}
          <div className="w-full my-12 md:rounded-md md:shadow-lg md:w-1/3">
            <div className="mt-10 mb-12 flex justify-center cursor-pointer">
              <Link href="/">
              <div className='flex-row flex'>
                      <Image priority={true} width={47} height={47} src="/logo2.webp" alt="Logo SC Property" />
                      <p className='ml-3 mt-2 font-bold text-2xl'>SCProperty</p>
                    </div>
              </Link>
            </div>  
            <div className="flex justify-between items-center md:px-7 px-2 mb-10">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Daftar</span>
              <span className="text-sm text-green-500 cursor-pointer"><Link href="/login">Masuk</Link></span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Name</span>
              <input value={name} placeholder="Your complete name" onChange={(e)=>setName(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : Martin Garixx</span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Phone Number</span>
              <input type="number" value={numberTelp} placeholder="Your phone number" onChange={(e)=>setNumberTelp(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : 081808908765</span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Email</span>
              <input type="email" value={email} placeholder="Your email" onChange={(e)=>setEmail(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : joni@gadaisyariah.com</span>
            </div>            
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Password</span>
              <input type="password" value={password} placeholder="Your password" onChange={(e)=>setPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>              
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Password Confirmation</span>
              <input type="password" value={passwordConfirm} placeholder="Your password confirmation" onChange={(e)=>setPasswordConfirm(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Kode Referral</span>
              <input value={ref} placeholder="Referral Code" onChange={(e)=>setRef(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : RAAS1995</span>
            </div>
            {(staAlertPassword)?(
              <div className="flex flex-col md:px-7 px-2">
                <div className="border border-red-300 rounded py-4 px-5">
                  <div className="flex justify-end cursor-pointer"><MdClose size={15} onClick={()=>setstaAlertPassword(false)}></MdClose></div>
                  <ul className=" list-outside text-xs  text-red-400">
                    <li className="pb-2">1. Minimal 8 Karakter</li>
                    <li>2. Harus Mengandung Angka</li>
                  </ul>                
                </div>
              </div>
            ):null}

            <div className="mt-7 md:px-7 px-2 flex flex-col">              
              <button onClick={handlerClickRegister} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                {(isClck)?"Loading..":"Daftar"}
              </button>
            </div>           
            <div className="mt-2 mb-7 flex justify-center">
              <span className="text-xs text-gray-400">Sudah punya akun?</span><span className="ml-2 text-xs text-blue-400 cursor-pointer"><Link href="/login" >Masuk Sekarang</Link></span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}