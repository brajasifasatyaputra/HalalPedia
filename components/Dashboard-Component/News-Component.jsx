import loadable from '@loadable/component'
import React from 'react';
import {useNews} from '../../api/get';

//const Carousel = loadable(()=>import("../Carousel-Component"))
const Loading = loadable(()=>import("../Loading-Component"))
const Image = loadable(()=>import('../ImageLazy-Component'))
const Link = loadable(()=>import("next/link"))

export default function NewsComponent(){  

  const {loadingNews, results} = useNews('news',4,0,0) 

  if(loadingNews){
    return(
      <Loading></Loading>
    )    
  }
  else if(results?.length === 0){
    return(
      <div className="min-h-full bg-white px-4 md:px-16">
      <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
        Our News
      </p>        
      <p className="text-center">This News list made to be your recommendation</p>
      <p className="text-center mt-10 font-semibold text-2xl">Mohon maaf data masih kosong untuk saat ini</p>
      </div>
    )
  }
  else{
    return(
      <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">
        <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
        Our News
        </p>        
        <p className="text-center">This News list made to be your recommendation</p>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">                              
          {results?.map((e, i)=>(
            <React.Fragment key={i}>
              <Link href={`/learn/${e?.slugs}`}>
                <div className=" shadow-2xl cursor-pointer">
                  <Image className="object-cover w-full h-48 rounded-t" threshold={300} src={e?.image} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
                  <div className=" px-3 mb-7">
                    <p className="pt-5 font-medium">{e?.title}</p>
                    <div className="flex justify-between mt-1">                    
                      <span className="text-sm text-blue-500">{e?.created_at}</span>
                    </div>                     
                  </div>            
                </div>                     
              </Link>
            </React.Fragment>                                
          ))}          
        </div>
      </div>
    )
  }
  
}