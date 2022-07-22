import loadable from '@loadable/component'
import { useRouter } from 'next/router'
import React from 'react';
import {useProductsWeb} from '../../api/get';

const Loading = loadable(()=>import("../Loading-Component"))
const Image = loadable(()=>import('next/image'))

export default function AppraisalComponent(){

  const router = useRouter()

  const {loadingProduct, dataProduct, notFoundProductInvest} = useProductsWeb(4,0,0)

  const handlerClickDetail = (id) => {
    router.push("/invest/[id]", `/invest/${id}`);
  }

  if(loadingProduct){
    return(
      <Loading></Loading>
    )    
  }
  else if(dataProduct?.length === 0 || notFoundProductInvest){
    return(
      <div className="min-h-full bg-white px-4 md:px-16">
      <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
        Our Appraisal Properties
      </p>        
      <p className="text-center">This Properties list is made to be your recommendation</p>
      <p className="text-center mt-10 font-semibold text-2xl">Mohon maaf data masih kosong untuk saat ini</p>
      </div>
    )
  }
  else{
    return(
      <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">
        <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
          Our Appraisal Properties
        </p>        
        <p className="text-center">This Properties list is made to be your recommendation</p>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">                              
          {dataProduct?.map((e, i)=>(
            <React.Fragment key={i}>
              <div className=" shadow-2xl cursor-pointer" onClick={()=>handlerClickDetail(e?.product_master_id)}>
                <Image className="rounded-t" width={400} height={270} threshold={300} src={e?.image} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
                <div className=" px-3 pb-4">
                  <p className="pt-5 font-semibold">{e?.title}</p>
                  {/* <div className="max-w-max mt-2">            
                    <div className="py-1 px-2 text-xs rounded text-white font-medium bg-green-500 ">
                      <p>{e?.category} - {e?.subcategory}</p>
                    </div>
                  </div> */}
                  <div className="flex justify-between mt-5">
                    <span>Max Token</span>
                    <span>{e?.token_max}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Bagi Hasil</span>
                    <span>{e?.bagi_hasil}</span>
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