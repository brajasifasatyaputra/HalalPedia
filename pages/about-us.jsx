import React   from 'react';
import loadable from '@loadable/component'

const Wrapper = loadable(()=>import("../components/Wrapper-Component"))
const Image = loadable(()=>import("next/image"))
 
export default function About() {   
    return(
    <Wrapper title="About Us - SC Property" description="Page for show compact infomation about SC Property">        
      <div className='md:mt-20 md:px-14 px-2  w-full flex flex-wrap'>
          <div className="md:w-1/2 w-full px-3 flex flex-wrap">
            <div className="flex justify-center">
              <Image className="object-cover rounded"  src="/about.webp" alt="Gambar about us SC Property" width={600} height={400}/>
            </div>
          </div>
          <div className="md:w-1/2 w-full px-3">
            <p className='mt-5 md:mt-0 text-2xl font-semibold'>Tentang Kami</p>            
            <p className='mt-2 md:mt-5 text-sm text-gray-800'>
              SC Property Indonesia adalah platform gadai emasi fisik
              yang berbasis syariah. Visi utama SC Property Indonesia adalah:
            <br/>
            <br/>
              "Memberikan pelayanan yang maximal bagi setiap nasabah kami 
              untuk melakukan gadai emas fisik berupa kenyamanan, kemudahan dan kecepatan
              saat transaksi."
              <br/>
              <br/>
              Untuk saat ini SC Property Indonesia hanya berfokus pada penggadaian emas fisik.
            </p>
          </div>
      </div>
      <div className="md:px-14 px-5">
        <div className="flex justify-center text-center">
          <p className="mt-10 md:mt-32 font-bold text-xl">Manejemen PT. SC Property Indonesia</p>         
        </div>
        <div className="flex justify-center text-center">        
          <p >Tim Manejemen dengan pengalaman di bidang industri,  </p>
        </div>
        <div className="flex justify-center text-center mb-5">        
          <p >keuangan & teknologi</p>
        </div>
        <div>
            <div className="grid md:grid-cols-4 ">
                <div className='flex items-center justify-center'>
                  <div className="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl items-center">             
                    <div className="mb-3">
                      <Image className="rounded-md" src="/paktaufik.webp" alt="Gambar commissioner SC Property indonesia" height={180} width={150}/>                   
                    </div>
                    <span className="text-center text-xl font-bold mb-1">Taufiq Aljufri</span>
                    <span className="text-center text-sm">Commissioner</span>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <div className="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl  items-center">              
                    <div className="mb-3">
                      <Image className="rounded-md" src="/pakadji.webp" alt="Gambar director SC Property indonesia" height={180} width={120}/>                   
                    </div>
                    <span className="text-center text-xl font-bold mb-1">Adji Waluyo P.</span>
                    <span className="text-center text-sm">Director</span>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <div className="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl items-center">                
                    <div className="mb-3">
                      <Image className="rounded-md" src="/pakarga.webp" alt="Gambar director SC Property indonesia" height={180} width={120}/>                   
                    </div>
                    <span className="text-center text-xl font-bold mb-1">Titiez Arga</span>
                    <span className="text-center text-sm">Director</span>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <div className="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl items-center">                  
                    <div className="mb-3">
                      <Image className="rounded-md" src="/pakcahya.webp" alt="Gambar deputy director SC Property indonesia" height={180} width={120}/>                   
                    </div>
                    <span className="text-center text-xl font-bold mb-1">TCF Yuriswadi</span>
                    <span className="text-center text-sm">Deputy Director</span>
                  </div>
                </div>
              
            </div>
            <div className="grid md:grid-cols-3 ">
              
                <div className='flex items-center justify-center'>
                  <div className="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl items-center">                  
                    <div className="mb-3">
                      <Image className="rounded-md" src="/pakhelmi.webp" alt="Gambar backend developer dan payment core SC Property indonesia" height={180} width={120}/>                   
                    </div>
                    <span className="text-center text-xl font-bold mb-1">Helmi Indra M.</span>
                    <span className="text-center text-sm">Backend Developer & Payment Core</span>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <div className="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl items-center">                  
                    <div className="mb-3">
                      <Image className="rounded-md" src="/rafi.webp" alt="Gambar mobile dan web developer SC Property indonesia" height={180} width={140}/>                   
                    </div>
                    <span className="text-center text-xl font-bold mb-1">Rafi Ahmad A S.</span>
                    <span className="text-center text-sm">Mobile & Web Developer</span>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <div className="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl items-center">                  
                    <div className="mb-3">
                      <Image className="rounded-md" src="/reza.webp" alt="Gambar frontend SC Property indonesia" height={180} width={150}/>                   
                    </div>
                    <span className="text-center text-xl font-bold mb-1">Reza Andriansyah</span>
                    <span className="text-center text-sm">Frontend Developer</span>
                  </div>
                </div>
              
            </div>
        </div>
      </div>
    </Wrapper>
    )
   
}
