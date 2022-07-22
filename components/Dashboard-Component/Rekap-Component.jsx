import loadable from '@loadable/component'
import React from 'react';

import {useRekap} from '../../api/get'
import {convertToMiliyar, convertToRp,convertToJuta} from "../../helper/converter";

const Loading = loadable(()=>import("../Loading-Component"))

export default function RekapComponent(){  

  const {loading, result} = useRekap()

  if(loading){
    return (
      <Loading></Loading>
    )
  }
  else{
    return(
      <div className="w-full bg-gray-100 px-4 md:px-16 py-5">                        
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-10 text-center">                                      
          <div className="mb-5 md:mb-0">
            <p className="text-5xl font-semibold text-green-600">{result?.total_project}</p>
            <p className="pt-5 text-gray-800">Banyak Proyek</p>
          </div>                      
          <div className="mb-5 md:mb-0">
            <p className="text-5xl font-semibold text-green-600">{result?.total_investor}</p>
            <p className="pt-5 text-gray-800">Investor Terdaftar</p>
          </div>                      
          <div className="mb-5 md:mb-0">
            <p className="text-5xl font-semibold text-green-600">{(result?.total_bagihasil>999999)?((result?.total_bagihasil>999999999)?convertToMiliyar(result?.total_bagihasil):(convertToJuta(result?.total_bagihasil))):(convertToRp(result?.total_bagihasil))}</p>
            <p className="pt-5 text-gray-800">Keuntungan Dibagikan</p>
          </div>                      
        </div>
      </div>
    )    
  }

}