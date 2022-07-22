import loadable from '@loadable/component'
import React from 'react';

const Image = loadable(()=>import('../ImageLazy-Component'))

export default function TestimoniComponent(){  

  return(
    <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-16">
      <p className="text-center pt-16 text-2xl font-semibold text-gray-900">
      Contact Us
      </p>  
      <div className="text-center">        
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe className='w-full mt-20' height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=Jl.%20Raya%20Dago,%20Cikuda,%20Kec.%20Parung%20Panjang,%20Bogor,%20Jawa%20Barat%2016360&t=&z=13&ie=UTF8&iwloc=&output=embed`} scrolling="no"> </iframe>              
          </div>
        </div>
      </div>
      <div className="w-full min-h-full bg-white">
        <div className="px-4 md:px-16   pt-20 ">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
            <p className="text-2xl font-semibold mb-4 text-gray-800">Contact</p>
              <div className="pl-0 mt-10">
              <a href="https://api.whatsapp.com/send?phone=628118808599&text=Halo%20SC%20Properti.%20Saya%20ingin%20bertanya%20tentang%20Beverly%20Lake%0A%0ANama%20:%0AAlamat%20:%0APertanyaan%20:%20" target='_blank' rel="noreferrer" className="border-2 border-green-500 bg-green-500 px-10 py-4  font-semibold text-white rounded hover:bg-white hover:text-black">Get Directions</a>
              <ul className="text-base mt-10 font-light">                  
                  <li className=" text-lg">0811-8808-599</li>                                     
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2">
            <p className="text-2xl font-semibold mb-4 text-gray-800">Address</p>
              <div className="pl-0 mt-10">
              <a href='https://www.google.com/maps/dir//Beverly+Lake/@-6.3661856,106.5163782,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x2e69e3ee4452b22d:0xc957a4a6552bc562!2m2!1d106.5864188!2d-6.3661903' target='_blank' rel="noreferrer" className="border-2 border-green-500 bg-green-500 px-10 py-4  font-semibold text-white rounded hover:bg-white hover:text-black">Get Directions</a>
              <ul className="text-base mt-10 font-light">
                  <li className="  text-lg"> Jl. Raya Dago, Cikuda, Kec. Parung Panjang, Bogor, Jawa Barat</li>
                  <li className="  text-lg">Kabupaten Bogor</li>
                  <li className=" text-lg">Jawa Barat 16360</li>
                  <li className="  text-lg">Jawa Barat 16360</li>
                  
                </ul>
              </div>
            </div>
          </div>
           
        </div>
      </div> 
    </div>
  )    
}