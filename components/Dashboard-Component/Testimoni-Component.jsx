import loadable from '@loadable/component'
import React from 'react';

const Image = loadable(()=>import('../ImageLazy-Component'))

export default function TestimoniComponent(){  

  return(
    <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">
      <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
        Testimoni Investor
      </p>        
      <p className="text-center">This list will display investors testimonials</p>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-10">                                      
        
        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-48 h-48 rounded-full" threshold={300} src={"https://properti.shariacoin.co.id:7901/storage/properti/dede_s.jpeg"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
          <div className=" px-7 mb-7">
            <p className="text-lg text-center pt-5 font-semibold text-gray-800">Dede S</p>
            <p className="pt-1 text-center text-gray-800">
            Saya tidak pandai buat testimoni, tapi saya percaya sama SC Property, Insya Allah amanah. Insya Allah berkah.
            </p>
          </div>            
        </div> 
        
        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-48 h-48 rounded-full" threshold={300} src={'https://properti.shariacoin.co.id:7901/storage/properti/edi.jpeg'} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
          <div className=" px-7 mb-7">
          <p className="text-lg text-center pt-5 font-semibold text-gray-800">Edi</p>
            <p className="text-center pt-5 text-gray-800">
            Domisili kami jauh dari kota metropolitan, mau investasi sangat kesulitan, tapi dengan SC Property semua jadi mudah karena semua pake aplikasi, nyaman gak pake ribet. Insya Allah berkah.
            </p>
          </div>            
        </div> 

        <div className="cursor-pointer">
          <div className="flex flex-wrap justify-center">
            <Image className="object-cover w-48 h-48 rounded-full" threshold={300} src={"https://properti.shariacoin.co.id:7901/storage/properti/ega.jpeg"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
          </div>
          <div className=" px-7 mb-7">
          <p className="text-lg text-center pt-5 font-semibold text-gray-800">Ega P</p>
            <p className="text-center pt-5 text-gray-800">
              Sebelumnya saya sempat pusing mau menginvestasikan uang saya kemana. Akhirnya teman saya menyarankan berinvestasi properti di sc propert. Sc properti mantab.
            </p>
          </div>            
        </div>                              
       
      </div>
    </div>
  )    
}