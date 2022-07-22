import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component'
const Select = loadable(()=>import('react-select'))
import {useRouter} from 'next/router';
import {convertToRp} from '../helper/converter'
import { useProvinsi,useKota,useDesa } from '../api/get';
import {   FiSearch } from 'react-icons/fi';
import {  alertError } from '../helper/sweetalert'
 
const Wrapper = loadable(()=>import("../components/Wrapper-Component"))

const limit = 10

export default function Gadai() {

  const router = useRouter();
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [desa, setDesa] = useState("");
  const [business, setBusiness] = useState("");
  const [listKota, setListKota] = useState([]);
  const [listDesa, setListDesa] = useState([]);
  const {loadingProvinsi, resProvinsi} = useProvinsi(); 
   
    return (
      <Wrapper title="Register Property - SC Property" description="Page for show register your property">
          <section  className=' bg-gray-100'>
              <div className="container md:px-48 px-5 md:py-16 py-20">
                <p className='text-4xl font-bold'>Register Your Property</p>
                <p className="md:pt-3 pt-10 lead text-gray-500 text-xl">Page ini akan menampilkan halaman untuk meregistrasi properti anda.</p>          
              </div>
            </section>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Nama Tempat/Usaha/Bisnis</span>
              <input type="text" value={business}  placeholder="Your Business"  onChange={(e)=>setBusiness(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : Kopi Si Untung</span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Nama Tempat/Usaha/Bisnis</span>
              <input type="text" value={business}  placeholder="Your Business"  onChange={(e)=>setBusiness(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : Kopi Si Untung</span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Nama Tempat/Usaha/Bisnis</span>
              <input type="text" value={business}  placeholder="Your Business"  onChange={(e)=>setBusiness(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : Kopi Si Untung</span>
            </div>
            <div className="col-span-12">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provinsi
              </label>
              <Select
                value={provinsi}
                placeholder=""
                onChange={(value)=>setProvinsi(value)}
                options={resProvinsi}                      
              />                  
            </div>

            <div className="col-span-12">
              <label  className="block text-sm font-medium text-gray-700 mb-1">
                Kota
              </label>

              <Select
                value={kota}
                placeholder=""
                onChange={(value)=>setKota(value)}
                options={listKota}                      
              />
            </div>

            <div className="col-span-12">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kecamatan
              </label>

              <Select
                value={desa}
                placeholder=""
                onChange={(value)=>setDesa(value)}
                options={listDesa}
              />
            </div>
      </Wrapper>
    )
  
}
