import loadable from '@loadable/component'
import React from 'react';

const Image = loadable(()=>import('../ImageLazy-Component'))

export default function TestimoniComponent(){  

  return(
    <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">
      <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
        Testimoni 
      </p>        
     
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-10">                                      
        
        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-48 h-48 rounded-full" threshold={300} src={"./user.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
          <div className=" px-7 mb-7">
            <p className="text-lg text-center pt-5 font-semibold text-gray-800">nunobig o</p>
            <p className="pt-1 text-center text-gray-800">
             Kerennnn lokasi nya... Ada danau buat santai
            </p>
          </div>            
        </div> 
        
        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-48 h-48 rounded-full" threshold={300} src={"./user.webp"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
          <div className=" px-7 mb-7">
          <p className="text-lg text-center pt-5 font-semibold text-gray-800">Adji W</p>
            <p className="text-center pt-5 text-gray-800">
            Coming soon hunian tepi danau di Parung Panjang Bogor.
            </p>
          </div>            
        </div> 

        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-48 h-48 rounded-full" threshold={300} src={"./user.webp"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
          <div className=" px-7 mb-7">
          <p className="text-lg text-center pt-5 font-semibold text-gray-800">Rafi Ahmad As Sidiq</p>
            <p className="text-center pt-5 text-gray-800">
            keren... semoga tetap jaya
            </p>
          </div>            
        </div> 
       
      </div>
      <div className="flex justify-center mt-10 md:mt-20">
        <div className="flex justify-between">
         
           <a rel="noreferrer" className='text-green-500 mr-3 border-b-2 font-semibold text-lg' href='https://www.google.com/search?hl=en-ID&gl=id&q=Beverly+Lake,+Jl.+Raya+Dago,+Cikuda+Wanaherang,+Parung+Panjang,+Bogor,+West+Java+16360&ludocid=14508245758897800546&lsig=AB86z5WHGawukfvYybfnHVfCWXuJ#lrd=0x2e69e3ee4452b22d:0xc957a4a6552bc562,3' target="_blank" >
           Write a Review
           </a>
           <a rel="noreferrer" className='text-green-500 ml-3 border-b-2 font-semibold text-lg' href='https://www.google.com/search?hl=en-ID&gl=id&q=Beverly+Lake,+Jl.+Raya+Dago,+Cikuda+Wanaherang,+Parung+Panjang,+Bogor,+West+Java+16360&ludocid=14508245758897800546&lsig=AB86z5WHGawukfvYybfnHVfCWXuJ#lrd=0x2e69e3ee4452b22d:0xc957a4a6552bc562,1' target="_blank" >
           Read More
           </a>
         
           
          
        </div>
      </div>
    </div>
  )    
}