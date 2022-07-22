import loadable from '@loadable/component'
import React from 'react';
import {useProductsSell} from '../../api/get';
import {useRouter} from 'next/router'

import { convertToRp } from '../../helper/converter';
 
const Carousel = loadable(()=>import("../Carousel-Component"))
const Loading = loadable(()=>import("../Loading-Component"))
const Image = loadable(()=>import('next/image'))

export default function RetailComponentSrec(){
  
  const router = useRouter()

  const {loadingProduct, data} = useProductsSell()

  const handlerClickDetail = (id) => {
    router.push("/srec/[id]", `/srec/${id}`);    
  }

  if(loadingProduct){
    return(
      <Loading></Loading>
    )    
  }
  else if(data == null || data?.length === 0){
    return(
      <div className="min-h-full bg-white md:px-14 px-5">
      <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
        Our Retail Properties
      </p>        
      <p className="text-center">This Properties list is made to be recommendation sale product</p>
      <p className="text-center mt-10 font-semibold text-2xl">Mohon maaf data masih kosong untuk saat ini</p>
      </div>
    )
  }
  else{
    return(
      <div className="min-h-full bg-white md:px-14 px-5 mb-10">
        <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
          Our Retail Properties
        </p>        
        <p className="text-center">This Properties list is made to be recommendation sale product</p>
        <div className="mt-20 ">                              
   
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-10">                              
          {data?.map((e,i)=>(
            <React.Fragment key={i}>
              <div className="shadow-2xl cursor-pointer" onClick={()=>handlerClickDetail(e?.property_retail_id)}>
                <Image className="rounded-t" width={450} height={350} threshold={300} src={e?.image} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
                <div className="px-4 md:px-7 mb-7">
                  <p className="pt-5 font-semibold">{e?.title}</p>                 
                  <div className="flex justify-between mt-5">
                    <span className="font-semibold">Harga Rupiah</span>
                    <span>{convertToRp(e?.price_rp)}</span>
                  </div>                  
                </div>            
              </div>                     
            </React.Fragment>                                
          ))}          
        </div>
    
        </div>
      </div>
    )
  }
  
}