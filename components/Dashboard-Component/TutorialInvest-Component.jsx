import loadable from '@loadable/component'
import React from 'react';

const Image = loadable(()=>import('../ImageLazy-Component'))

export default function TutorialInvestComponent(){  

  return(
    <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">
      <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
        How to invest in SC Property??
      </p>        
      <p className="text-center">This section you will find out how to start investing in ScProperty</p>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-10">                                      
        <div className="md:shadow-2xl cursor-pointer">
          <Image className="object-cover w-full h-full rounded-t" threshold={300} src={"/wfh1.webp"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          <div className=" px-7 mb-7">
            <p className="pt-5 text-gray-800"><span className="text-lg font-semibold">Pertama</span>, Untuk memulai investasi properti kamu perlu memilih properti yang ingin kamu percayakan</p>
          </div>            
        </div>                                     
        <div className="md:shadow-2xl cursor-pointer">
          <Image className="object-cover w-full h-full mt-28 rounded-t" threshold={300} src={"/wfh(1).webp"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          <div className=" px-7 mb-7">
            <p className="pt-5 text-gray-800"><span className="text-lg font-semibold">Kedua</span>, Mulailah investasikan dana kamu yang di sesuaikan dengan budget mu, Scproperty menawarkan investasi mulai dari Rp. 100.000</p>
          </div>            
        </div> 
        <div className="md:shadow-2xl cursor-pointer">
          <Image className="object-cover w-200 h-full mt-8 rounded-t" threshold={300} src={"/bitcoin-trading.webp"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          <div className=" px-7 mb-7">
            <p className="pt-5 text-gray-800"><span className="text-lg font-semibold">Ketiga</span>, Nikmati keuntungan investasi properti berupa capital gain, rent income ataupun perpaduan keduanya</p>
          </div>            
        </div> 
      </div>
    </div>
  )    
} 