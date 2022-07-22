import loadable from '@loadable/component'
import React from 'react';

const Image = loadable(()=>import('../ImageLazy-Component'))

export default function TestimoniComponent(){  

  return(
    <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">
      <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
        Galery 
      </p>        
     
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">                                      
        
        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-96 h-96  " threshold={300} src={"./img1.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
                   
        </div> 
        
        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
          <Image className="object-cover w-96 h-96  " threshold={300} src={"./img2.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
                    
        </div> 

        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-96 h-96  " threshold={300} src={"./img3.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>  
          </div>
                      
        </div> 
       
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">                                      
        
        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-96 h-96  " threshold={300} src={"./img4.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
                   
        </div> 
        
        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
          <Image className="object-cover w-96 h-96  " threshold={300} src={"./img5.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
                    
        </div> 

        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-96 h-96  " threshold={300} src={"./img6.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>  
          </div>
                      
        </div> 
       
      </div>
       
    </div>
  )    
}