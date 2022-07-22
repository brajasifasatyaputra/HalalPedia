import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

import {useStoreModal, useTemplateTipeModal } from '../store/modal-store';
import {useStoreAuth} from '../store/auth-store'
import {useStatusUser} from '../store/status-store'

import {FiUser} from 'react-icons/fi' 
import { getStatusUser, getUserWadiah,getUserLogin,getUserReferal } from '../helper/localStorage';
import { convertToRp } from '../helper/converter';
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { useRouter } from 'next/router';

export default function NavigationComponent() {

  const router = useRouter()

  const { authStore } = useStoreAuth();
  const {statusUserStore} = useStatusUser()
  
  const [show, setShow] = useState(false);
  const [showOther, setShowOther] = useState(false);
  
  const [showSetting, setShowSetting] = useState(false);  
  const [showInbox, setShowInbox] = useState(false);  

  const [showMore, setShowMore] = useState(false);

  const [staMenuMobile, setStaMenuMobile] = useState(false);  
  const [staMenuAboutMobile, setStaMenuAboutMobile] = useState(false);  
  const [staMenuOtherMobile, setStaMenuOtherMobile] = useState(false);    
  const {showModal} = useStoreModal()
  const {changeTipeModal} = useTemplateTipeModal()

  const handlerUserStatusCheck = (defaultRoute) => {    
    if(statusUserStore === 4 || getStatusUser() == "4") return defaultRoute;
    return "/complete";
  }  

  const handlerTopup = () => {
    if(statusUserStore !== 4 || getStatusUser() != "4"){
      router.push("/complete")
      return
    }
    changeTipeModal("topup");
    handlerClickSetting();
    showModal();
  }

  const handlerAlert = (modal) => {
    if(statusUserStore !== 4 || getStatusUser() != "4"){
      router.push("/complete")
      return
    }
    changeTipeModal(modal);
    handlerClickSetting();
    showModal();
  }

  const handlerWithdraw = () => {
    if(statusUserStore !== 4 || getStatusUser() != "4"){
      router.push("/complete")
      return
    }
    changeTipeModal("tarik-saldo")
    handlerClickSetting();    
    showModal()
  }      

  const handlerClickSetting = () => {    
    setShowSetting(!showSetting)
    setShowInbox(false)    
    setShow(false)
    setShowOther(false)
  }

  const handlerClickInbox = () => {  
    if(statusUserStore === 4 || getStatusUser() == "4"){
      router.push("/inbox")
      return
    }  
    router.push("/complete")
    return
  }

  const handlerClickProfile = () => {
    setShowSetting(false)
    setShowInbox(false)    
    setShowOther(false)
    setShow(!show)
  }  
  const handlerClickOther = () => {
    setShowSetting(false)
    setShowInbox(false)    
    setShow(false)
    setShowOther(!showOther)
  }  
  
 
  return (
    <>
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">

            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button onClick={()=>setStaMenuMobile(!staMenuMobile)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              
              <div className="flex-shrink-0 flex items-center">
                  <div className="block lg:hidden cursor-pointer">
                    <Link passHref href="/">
                      <Image priority={true} width={35} height={35}  src="/logo2.webp" alt="Logo SC Property" />
                    </Link>
                  </div>
                  <div className="hidden lg:block cursor-pointer">
                    <Link passHref href="/">
                    <div className='flex-row flex'>
                      <Image priority={true} width={33} height={33} src="/logo2.webp" alt="Logo SC Property" />
                      <p className='ml-3 font-bold text-2xl'>SCProperty</p>
                    </div>
                    </Link>
                  </div>                
              </div>

              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">                  
                  
                  <Link passHref href="/">
                    <p className=" text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium" >Home</p>
                  </Link>
                                     
                  <Link passHref href="/srec">
                    <p className=" text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium" >
                      SREC
                    </p>
                  </Link>
                  
                  <Link passHref href="/invest">
                    <p className=" text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium" >
                      Investment
                    </p>
                  </Link>
                  <div  className="relative text-gray-300 hover:bg-gray-200 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    
                    <button className="cursor-pointer menu text-gray-500 focus:outline-none focus:shadow-solid font-medium" onClick={handlerClickOther}>
                      Other
                    </button>

                    {(showOther)?(
                      <div className="origin-top-right absolute left-0 top-12 w-48 py-2 mt-1 bg-white text-gray-500 rounded shadow-md z-50">
                        
                        <Link passHref href="/learn">
                          <span className="cursor-pointer block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                            Learn
                          </span>
                        </Link>

                        <Link passHref href="/news">
                          <span className="cursor-pointer block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                            News
                          </span>
                        </Link>
                        
                      </div>                    
                    ):null}

                  </div>
                  <div  className="relative text-gray-300 hover:bg-gray-200 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                    
                    <button className="cursor-pointer menu text-gray-500 focus:outline-none focus:shadow-solid font-medium" onClick={handlerClickProfile}>
                      About
                    </button>

                    {(show)?(
                      <div className="origin-top-right absolute left-0 top-12 w-48 py-2 mt-1 bg-white text-gray-500 rounded shadow-md z-50">
                        
                        <Link passHref href="/term">
                          <span className="cursor-pointer block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                            Term Condition
                          </span>
                        </Link>

                        <Link passHref href="/faq">
                          <span className="cursor-pointer block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                            FAQ
                          </span>
                        </Link>
                        <Link passHref href="/about-us">
                          <span className="cursor-pointer block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                            About Us
                          </span>
                        </Link>
                        <Link passHref href="/guide">
                          <span className="cursor-pointer block px-4 py-2 hover:bg-green-500 hover:text-green-100">
                            Help
                          </span>
                        </Link>
                      </div>                    
                    ):null}

                  </div>
                  <Link passHref href="/tagihan">
                    <p className=" text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium" >
                      Tagihan
                    </p>
                  </Link>
                </div>
              </div>

            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">                          
              <div className={`${(!authStore)?"hidden":""} ml-1 relative text-gray-300 hover:bg-gray-200 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium`}>
                
                <button onClick={handlerClickInbox} className="bg-gray-200 cursor-pointer p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-400 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>                

              </div>
              
              {(!authStore)?(
                <div className="flex">
                  <Link passHref href="/register">
                    <button type="button" className="hidden md:block mr-1 py-1 px-2 bg-green-500 rounded text-white font-bold text-sm hover:bg-green-400">
                      Register
                    </button>
                  </Link>
                  <Link passHref href="/login">
                    <button type="button" className="ml-2 py-1 px-2 border-2 border-green-500 rounded text-green-500 text-sm font-bold hover:bg-green-300 hover:text-white hover:border-0">
                      Sign in
                    </button>
                  </Link>
                </div>
              ):null}
              
              <div className={`${(authStore)?"px-3 ml-3":""} relative text-gray-300 hover:bg-gray-200 hover:text-gray-500 py-2 rounded-md text-sm font-medium`}>
                
                <div>                  
                  
                  {(authStore)?(
                    <button onClick={handlerClickSetting} type="button" className="flex text-sm rounded-full focus:outline-none " id="user-menu-button" aria-expanded="false" aria-haspopup="true">                    
                      <div className="h-8 w-8 text-center font-thin text-gray-400 rounded-full">
                        <FiUser size={30}></FiUser>
                      </div>
                    </button>
                  ):null}

                  {(showSetting)?(
                    <div className="origin-top-right absolute z-40 right-0 w-64 md:w-80 top-12 py-2 mt-3 text-gray-500 bg-white rounded shadow-md">
                      {(!authStore)?(
                        <>
                        <Link passHref href="/login">
                          <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                            Log in
                          </span>
                        </Link>
                        <Link passHref href="/register">
                          <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                            Register
                          </span>
                        </Link>
                        </>
                      ):(
                        <>     
                          <div className=" w-full flex flex-wrap ">
                            <div className="w-full px-3 border-b-2 border-gray-100 p-4">
                              <p className="font-semibold">{`${getUserLogin().toUpperCase()}`}</p>                              
                              <p className="flex">
                                {`${getUserReferal()} - Kode Referral`}
                                <Link passHref href={handlerUserStatusCheck("/referral")}>
                                  <AiOutlineInfoCircle className="ml-1 cursor-pointer" size={12}></AiOutlineInfoCircle>
                                </Link>
                              </p>
                            </div>
                            <div className="w-full md:w-1/2">
                              <div className="px-3 pt-2">
                                <p className="mb-1 flex">
                                  Saldo 
                                  {/* <Link href={handlerUserStatusCheck("/mutation")}>
                                    <AiOutlineInfoCircle className="cursor-pointer ml-1" size={12}></AiOutlineInfoCircle>                                  
                                  </Link> */}
                                </p>
                                <p className="font-semibold">{convertToRp(getUserWadiah())}</p>                                
                                <button onClick={handlerTopup} className="bg-green-400 mt-4 w-full hover:bg-green-300 text-white rounded cursor-pointer font-semibold p-2 ">Topup Saldo</button>
                                <button onClick={handlerWithdraw} className="ring-1 ring-green-400 mt-2 w-full text-green-400 rounded cursor-pointer font-semibold p-2 ">Tarik Saldo</button>
                              </div>
                            </div>
                            <div className="w-full mt-2 md:mt-0 md:w-1/2">  
                              <div className="hidden lg:block">
                                <Link passHref href={handlerUserStatusCheck("/my-asset")}>  
                                  <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                    Dashboard Akun
                                  </span>
                                </Link>                                                        
                              </div>
                              <div className=" block lg:hidden">
                                <span onClick={()=>setShowMore(!showMore)} className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                  Dashboard Akun
                                </span> 
                                {(!showMore)?null:(
                                  (getStatusUser() != "4")?null:(
                                    <div className="pl-3">
                                      <Link passHref href="/my-asset">
                                        <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                          My Asset
                                        </span>
                                      </Link>   
                                      <Link passHref href="/my-properties">
                                        <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                          Portofolio
                                        </span>
                                      </Link>                                                                                                                                 
                                      <div className="w-full border border-gray-100"></div>                                      
                                      <Link passHref href="/piutang">
                                        <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                          Mutasi Tagihan
                                        </span>
                                      </Link>                                              
                                      <Link passHref href="/mutation">
                                        <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                          Riwayat
                                        </span>
                                      </Link>                                              
                                      <Link passHref href="/mutation-withdraw">
                                        <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                          Mutasi Penarikan
                                        </span>
                                      </Link>                                              
                                      <div className="w-full border border-gray-100"></div>                                                                                   
                                      <Link passHref href="/akun/profile">
                                        <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                          Profile
                                        </span>
                                      </Link>                                                                             
                                      <Link passHref href="/akun/setting/profile">
                                        <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                          Setting Profile
                                        </span>
                                      </Link>                                                                             
                                      <Link passHref href="/bank">
                                        <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                          Setting Bank
                                        </span>
                                      </Link>                                       
                                    </div>
                                  )
                                )}
                              </div>                              
                              <Link passHref href="/logout">
                                <span className="block cursor-pointer px-4 py-2 hover:bg-green-500 hover:text-green-100">
                                  Log Out
                                </span>
                              </Link>                                                                      
                            </div>
                          </div>                     
                        </>
                      )}                      
                    </div>                  
                  ):null}                  

                </div>

              </div>

            </div>
          </div>
        </div>

        
        <div className={(staMenuMobile)?"":"hidden"} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">            
            <Link passHref href="/">
              <p className=" cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium" >
                Home
              </p>
            </Link>
            <Link passHref href="/srec">
              <p className=" cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium" >
                SREC
              </p>
            </Link>            
            <Link passHref href="/invest">
              <p className=" cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium" >
                Investment
              </p>
            </Link>
            <Link passHref href="/tagihan">
              <p className=" cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium" >
                Tagihan
              </p>
            </Link>
           
            <div className="text-gray-300 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base ">              
              <button onClick={()=>setStaMenuOtherMobile(!staMenuOtherMobile)} className="menu text-gray-500 focus:outline-none focus:shadow-solid font-medium">
                Other
              </button>
            </div>     
                             
            

            {(staMenuOtherMobile)?(
              <>         
             
              <Link passHref href="/learn">
              <div className="text-gray-300 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base  ">              
                <button className="menu text-gray-500 focus:outline-none focus:shadow-solid font-medium" onClick={() => setShow(!show)}>
                Learn
                </button>
              </div>
              </Link>     
              <Link passHref href="/news">
              <div className="text-gray-300 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">              
                <button className="menu text-gray-500 focus:outline-none focus:shadow-solid " onClick={() => setShow(!show)}>
                News
                </button>
              </div>            
              </Link>              
               
              </>
            ):<></>}
            <div className="text-gray-300 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">              
              <button onClick={()=>setStaMenuAboutMobile(!staMenuAboutMobile)} className="menu text-gray-500 focus:outline-none focus:shadow-solid ">
                About
              </button>
            </div>            
            

            {(staMenuAboutMobile)?(
              <>              
              <Link passHref href="/faq">
              <div className="text-gray-300 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">              
                <button className="menu text-gray-500 focus:outline-none focus:shadow-solid " onClick={() => setShow(!show)}>
                  FAQ
                </button>
              </div>
              </Link>     
              <Link passHref href="/term">
              <div className="text-gray-300 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">              
                <button className="menu text-gray-500 focus:outline-none focus:shadow-solid " onClick={() => setShow(!show)}>
                  Term Condition
                </button>
              </div>            
              </Link>              
              <Link passHref href="/about-us">
              <div className="text-gray-300 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">              
                <button className="menu text-gray-500 focus:outline-none focus:shadow-solid " onClick={() => setShow(!show)}>
                  About Us
                </button>
              </div>
              </Link>          
              <Link passHref href="/guide">
              <div className="text-gray-300 hover:bg-gray-200 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">              
                <button className="menu text-gray-500 focus:outline-none focus:shadow-solid " onClick={() => setShow(!show)}>
                  Help
                </button>
              </div>
              </Link>
              </>
            ):<></>}



          </div>
        </div>
      </nav>
    </>
  )
}