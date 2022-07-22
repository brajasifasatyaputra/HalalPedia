import React, {useEffect, useState} from 'react';
import loadable from '@loadable/component'

import {convertToRp} from '../helper/converter'
import {useProduk } from '../api/get';

import {AiOutlineFileSearch} from 'react-icons/ai'
const Image = loadable(()=>import("../components/ImageLazy-Component"))
const Wrapper = loadable(()=>import("../components/WrapperProfile"))
const Link = loadable(()=>import('next/link'))
const ProgressBar = loadable(()=>import('@ramonak/react-progress-bar'))

const limit = 10

export default function MyProperties() {  
 
  const [data, setData] = useState(null);
   
    const {resultProduk,resultProdukFirst} = useProduk();      

    // useEffect(()=>{
    //   if(data == null){
    //     setData(resultProdukFirst)
    //   }
    // },[])
   
    return (
      <Wrapper index={1} title="My Property - SC Property" description="Page for show list activity your transaction SC Property">
        <div className="w-full">
          <div className="w-full flex flex-row flex-wrap">            
            <div className="md:w-1/3 w-full ">
              <p className="text-2xl font-semibold text-gray-800">Page Portofolio</p>
              <p className="text-sm text-gray-800">Page ini akan menampilkan preview Properties yang telah dibeli</p>
              <div className='mt-5'>              
              <div className='md:block overflow-y-auto h-screen hidden space-y-10'>
              {resultProduk?
                resultProduk?.map((e,i)=>(                  
                    <div onClick={()=>setData(e)} className=" bg-white md:w-full items-center cursor-pointer" key={i}>
                      <div className={`w-full rounded ${data===null?e===resultProdukFirst?`border-2 border-green-500`:``:e===data?`border-2 border-green-500`:``} md:p-5`}>                                                  
                          <div className='flex-row flex'>
                            <p className="text-lg font-thin text-green-500">PRODUK ID #{e.product_id}</p>
                            <a href={e.token_address} target='blank'>
                              <AiOutlineFileSearch  className='ml-2 mt-1 text-blue-500 cursor-pointer' size={20}/>
                            </a>                            
                          </div>
                          <div className='flex flex-col mt-5'>                            
                            <p className="text-gray-800 font-semibold">Title :</p>   
                            <p className="text-gray-800">{e.product_title}</p>                                                      
                            
                            <p className="text-gray-800 font-semibold mt-2">Project Date</p>   
                            <p className="text-gray-800">{e.project_date}</p>                                                      
                            
                            <p className="text-gray-800 font-semibold mt-2">Total Lot</p>   
                            <p className="text-gray-800">{e.my_asset} Lot</p>                                                                                                                                                     
                          </div>                          
                        </div>
                      </div>                                   
                  )):null
                  }
                  </div> 
            <div className='md:hidden flex overflow-x-auto space-x-10'>
              {resultProduk?
                resultProduk?.map((e,i)=>(
                
 
                      <div onClick={()=>setData(e)} className="w-full rounded" key={i}>
                        <div className={`pt-3 w-80 px-3 ${data===null?e===resultProdukFirst?`border-2 border-green-400 rounded`:``:e===data?`border-2 border-green-500`:``}`}>
                          
                          <div className='flex-row flex'>
                            <p className="text-lg font-thin text-green-500">PRODUK ID #{e.product_id}</p>
                            <a href={e.token_address} target='blank'>
                              <AiOutlineFileSearch  className='ml-2 mt-1 text-blue-500 cursor-pointer' size={20}/>
                            </a>
                            
                          </div>

                             <div className='flex flex-col mt-5 mb-5'>
                              <p className="text-gray-800 font-semibold">Title :</p>   
                              <p className="text-gray-800">{e.product_title}</p>                                                      
                              
                              <p className="text-gray-800 font-semibold mt-2">Project Date</p>   
                              <p className="text-gray-800">{e.project_date}</p>                                                      
                              
                              <p className="text-gray-800 font-semibold mt-2">Total Lot</p>   
                              <p className="text-gray-800">{e.my_asset  } Lot</p>                                                                                                                     
                            </div>
                          </div>
                        </div>
                     
                  
                  )):null
                  }
                  </div> 
                </div>  
                  
                </div>

              <div className="md:w-2/3 md:mt-0 mt-5  w-full md:pl-10  ">                                             
                                      
                  {data != null||resultProdukFirst != null?
                    <>
                    <div className="">
                      <div className="w-full flex flex-row flex-wrap">
            
                         <div className="w-full">                            
                            <p className="text-xl font-semibold text-gray-800">
                              Profile Projek
                            </p>                            
                              
                            <p className="text-sm text-justify text-gray-800 mt-2" dangerouslySetInnerHTML={{__html:data?data?.product_description?.substring(0,200)+'...':resultProdukFirst.product_description?.substring(0,200)+'...'}}></p>
                            <Link href={`/invest/${data?data?.product_id:resultProdukFirst.product_id}`}>   
                              <p className="text-blue-500 hover:text-blue-400 cursor-pointer mt-2">Selengkapnya</p>   
                            </Link>                                                                        
                          </div>                          
                          
                      </div>                                            
                      
                      <div className="text-sm">

                        <div className='my-2 flex flex-row justify-between'> 
                          <p className="">Nama Properti</p>   
                          <p className=" ">{data?data?.product_title:resultProdukFirst?.product_title}</p>                        
                        </div>
                        
                        <div className='my-2 flex flex-row justify-between'> 
                          <p className="">Total Lot</p>   
                          <p className=" ">{data?data?.my_asset:resultProdukFirst?.my_asset} Lot</p>                        
                        </div>
                        
                        <div className='my-2 flex flex-row justify-between'>  
                          <p className="">Besar Dividen</p>   
                          <p className="">{data?data?.bagi_hasil:resultProdukFirst?.bagi_hasil}</p>                        
                        </div>

                        <div className="border w-full border-gray-100 my-4"></div>

                        <div className='my-2 flex flex-row justify-between'>  
                          <p className="">Tanggal Mulai</p>   
                          <p className="">{data?data?.project_date:resultProdukFirst?.project_date}</p>                        
                        </div>

                        <div className='my-2 flex flex-row justify-between'>  
                          <p className="">Tanggal Selesai</p>   
                          <p className="">{data?data?.project_end_date:resultProdukFirst?.project_end_date}</p>                        
                        </div>

                        <div className="border w-full border-gray-100 my-4"></div>

                        <div className='my-2 flex flex-row justify-between'>  
                          <p className="">Alamat Token</p>   
                          <a  className="text-blue-400 hover:text-blue-500 "href={data?data?.token_address:resultProdukFirst?.token_address} target="_blank" rel="noopener noreferrer">Click Here</a>
                        </div>
                                        
                      </div>                      
                     
                    </div>
                 </>
                :<div>Saat ini kamu belum membeli atau memilih asset, silahkan beli atau pilih asset terlebih dahulu. </div>}
            </div>


        </div>
      </div>
         
      </Wrapper>
    )
  
}
