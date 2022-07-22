import loadable from '@loadable/component'
import React from 'react';
import {useProductsSell} from '../../api/get';

import {useRouter} from 'next/router'

import { convertToRp } from '../../helper/converter';

const Loading = loadable(()=>import("../Loading-Component"))
const Image = loadable(()=>import('next/image'))

export default function AppraisalComponent(){

  const router = useRouter()
  const {loadingProduct, limitProductSell} = useProductsSell()

  const handlerClickDetail = (id) => {
    router.push("/srec/[id]", `/srec/${id}`);    
  }
  const goToMaps = () => {
    router.push(e?.gmap_url);
  }

  if(loadingProduct){
    return(
      <Loading></Loading>
    )    
  }
  else if(limitProductSell?.length === 0){
    return(
      <div className="min-h-full bg-white px-4 md:px-16">
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
      <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">
        <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
          Our Retail Properties
        </p>        
        <p className="text-center">This Properties list is made to be recommendation sale product</p>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-10">                              
          {limitProductSell?.map((e,i)=>(
            <React.Fragment key={i}>
              <div className="shadow-2xl cursor-pointer" onClick={()=>handlerClickDetail(e?.property_retail_id)}>
                <Image className="rounded-t" width={450} height={350} threshold={300} src={e?.image} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
                <div className="px-4 md:px-4 mb-5">
                  <p className="pt-5 font-bold">{e?.title}</p>                 
                  <div className="flex justify-between mt-3">
                    <span className="font-semibold">Available</span>
                    <span className="text-green-700">{e?.stok}</span>
                  </div>                  
                  <div className='mt-4'>
                    <span className="font-semibold">Spesifikasi :</span>
                  </div>
                  <div className="flex justify-between text-green-700">
                    <span>{e?.luas_tanah}m2, </span>
                    <span>{e?.jumlah_lantai} lantai, </span>
                    <span>{e?.kamar_tidur} kamar,</span>
                    <span>{e?.kamar_mandi} kamar mandi</span>
                  </div>                  
                  <div className="flex justify-between mt-3">
                    <span className="font-semibold">Harga Rupiah</span>
                    <span className="text-green-700">{convertToRp(e?.price_rp)}</span>
                  </div>                  
                  <div className="flex justify-between mt-3">
                    <span className="font-semibold">Lokasi</span>
                    <a href={e?.gmap_url} target='_blank' className='text-red-300'>Google Maps</a>
                  </div>                  
                </div>            
              </div>                     
            </React.Fragment>                                
          ))}          
        </div>
      </div>
    )
  }
  
}