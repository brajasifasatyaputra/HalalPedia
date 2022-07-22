import loadable from '@loadable/component'
import { useRouter } from 'next/router'
import React from 'react';
import {useProductsWeb} from '../../api/get';

const Loading = loadable(()=>import("../Loading-Component"))
const Image = loadable(()=>import('../ImageLazy-Component'))

export default function AppraisalComponent(){
 
    return(
      <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">        
        
        <div className="text-center">                              
          <Image className="object-cover w-5/8 h-3/8 rounded-t" threshold={300} src={'./lake.webp'} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/> 
        </div>

        

      </div>

    )
 
  
}