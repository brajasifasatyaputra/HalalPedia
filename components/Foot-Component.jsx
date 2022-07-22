import React from "react";
import Image from 'next/image'
import Link from 'next/link'
import {FaInstagram,FaYoutube,FaWhatsapp} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
export default function FootComponent(){
  return(
    <React.Fragment>
      <div className="flex flex-col bottom-0 bg-gray-50 min-w-full h-98 font-sans md:p-5 md:grid md:grid-cols-3 md:gap-4 md:pb-10">        
        <div className="p-5 pb-0 mb:p-0">
          <div className="mt-5 md:pl-7">
            <span className="text-lg font-semibold">
              Hubungi Kami
            </span>
          </div>
          <div className="pt-5 md:pl-7">
            <a href="https://www.google.com/maps/dir/-6.2682185,106.8296376/gadai+syariah+indonesia/@-6.2557505,106.8195001,15z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2e69f3cff78ef6cb:0xde4efcf027f7f54c!2m2!1d106.8256015!2d-6.2449552" target="blank">
              <span className="text-sm text-gray-600">
                Jl. Mampang Prapatan Raya<br/> No. 56D, Jakarta Selatan
              </span>            
            </a>
          </div>
          <div className="pt-5 md:pl-7">
            <a target="blank" href="https://api.whatsapp.com/send?phone=6281273715633&text=Halo%20SC%20Properti.%20Saya%20ingin%20bertanya%20tentang%20SC%20Properti%0A%0ANama%20:%0AAlamat%20:%0APertanyaan%20:%20">
              <div className="flex text-gray-600 cursor-pointer hover:text-blue-500">
                <FaWhatsapp size={20}></FaWhatsapp>
                <span className="text-sm ml-2">
                 0812-7371-5633
                </span>    
              </div>
            </a>        
          </div>
          <div className="pt-5 md:pl-7">
            <a target="blank" href="https://api.whatsapp.com/send?phone=6282112831074&text=Halo%20SC%20Properti.%20Saya%20ingin%20bertanya%20tentang%20SC%20Properti%0A%0ANama%20:%0AAlamat%20:%0APertanyaan%20:%20">
              <div className="flex text-gray-600 cursor-pointer hover:text-blue-500">
                <FaWhatsapp size={20}></FaWhatsapp>
                <span className="text-sm ml-2">
                  0821-1283-1074
                </span>            
              </div>
            </a>
          </div>
          <div className="pt-5 md:pl-7">
            <a target="blank" href="https://api.whatsapp.com/send?phone=628119007525&text=Halo%20SC%20Properti.%20Saya%20ingin%20bertanya%20tentang%20SC%20Properti%0A%0ANama%20:%0AAlamat%20:%0APertanyaan%20:%20">
              <div className="flex text-gray-600 cursor-pointer hover:text-blue-500">
                <FaWhatsapp size={20}></FaWhatsapp>
                <span className="text-sm ml-2">
                 0811-9007-525
                </span>            
              </div>
            </a>
          </div>
        </div>
        <div className="p-5 pb-0 mb:p-0">
          <div className="mt-5 md:pl-10">
            <span className="text-lg font-semibold">
                Punya Pertanyaan?
            </span>
          </div>
          <div className="pt-5 md:pl-10">
            <ul className="list-outside font-thin">
              <li className="pb-2  text-gray-600"><Link href="/faq">FAQ</Link></li>
              <li className="pb-2  text-gray-600"><Link href="/term">Term and Condition</Link></li>
            </ul>
            <p className="mt-4 text-blue-500 text-lg">*Gunakan Chrome untuk pengalaman terbaik</p>
          </div>
        </div>   
           
        <div className="mb-2">
          <div className="mt-10 text-center">
            <span className="text-lg font-semibold">
              Social Media
            </span>
          </div>
          <div className="flex justify-center">            
            <div className="p-5 cursor-pointer text-purple-600"><a target="blank" href="https://instagram.com/scproperty.official?utm_medium=copy_link"><FaInstagram size={25}/></a></div>
            <div className="p-5 cursor-pointer text-red-600"><a target="blank" href=" "><FaYoutube size={25}/></a></div>
            <div className="p-5 cursor-pointer"><a target="blank" href=" "><SiTiktok size={25}/></a></div>              
          </div>
          <div className="mt-5 flex justify-center cursor-pointer">
            <a href="https://play.google.com/store/apps/details?id=id.sharia.srec" target="blank">
              <div className="flex flex-col">
                <Image src={"/android.webp"} width={150} height={50}></Image>
              </div>
            </a>
          </div>
          <div className="mt-2 flex justify-center cursor-pointer">
            <a href="https://apps.apple.com/id/app/sc-property/id1555668946" target="blank">
              <div className="flex flex-col">
                <Image src={"/ios.webp"} width={150} height={50}></Image>
              </div>
            </a>
          </div>
        </div>        
      </div>
    </React.Fragment>    
  )
}