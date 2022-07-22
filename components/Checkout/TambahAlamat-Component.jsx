import React, {useState, useEffect} from "react"
import loadable from '@loadable/component'

import Link from 'next/link'

import {useProvinsi, useKota, useDesa} from '../../api/get'
import {tambahAlamat} from '../../api/post'
import { alertError, alertQuestion, alertSuccess, alertWarning } from "../../helper/sweetalert"

const Select = loadable(()=>import('react-select'))
const Loading = loadable(()=>import('../Loading-Component'))

const listDropship = [{value:true, label:"Iya, Saya dropship"}, {value:false, label:"Tidak, Saya bukan dropship"}]

export default function TambahAlamat({setTampil}){

  const [penerima, setPenerima] = useState("");
  const [toko, setToko] = useState("");
  const [phone, setPhone] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [isDropship, setIsDropship] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [listKota, setListKota] = useState([]);
  const [listDesa, setListDesa] = useState([]);

  const {loadingProvinsi, resProvinsi} = useProvinsi();

  const handlerGetKota = async (id) => {
    return await useKota(id)
  }

  const handlerGetDesa = async (id) => {
    return await useDesa(id)
  }

  useEffect(()=>{
    if(provinsi?.value != null){
      (async()=>{
        const tmp = await handlerGetKota(provinsi?.value)        
        setListKota(tmp)
      })()
    }        
  },[provinsi]);  

  useEffect(()=>{
    if(kota?.value != null){
      (async()=>{
        const tmp = await handlerGetDesa(kota?.value)        
        setListDesa(tmp)
      })();
    }    
  },[kota]);

  const handlerClickTambahAlamat = async () => {
    setIsLoading(true)
    if(penerima?.length === 0){
      await alertWarning("Warnings", "Mohon lengakpi form Nama Penerima terlebih dahulu")
      setIsLoading(false)
      return
    }
    if(toko?.length === 0){
      await alertWarning("Warnings", "Mohon lengakpi form Nama Toko terlebih dahulu")
      setIsLoading(false)
      return
    }
    if(phone?.length === 0){
      await alertWarning("Warnings", "Mohon lengakpi form No Handphone terlebih dahulu")
      setIsLoading(false)
      return
    }
    if(alamat?.length === 0){
      await alertWarning("Warnings", "Mohon lengakpi form Alamat terlebih dahulu")
      setIsLoading(false)
      return
    }
    if(provinsi?.label === ""){
      await alertWarning("Warnings", "Mohon lengakpi form Provinsi terlebih dahulu")
      setIsLoading(false)
      return
    }
    if(kota?.label === ""){
      await alertWarning("Warnings", "Mohon lengakpi form Kota terlebih dahulu")
      setIsLoading(false)
      return
    }
    if(kecamatan?.label === ""){
      await alertWarning("Warnings", "Mohon lengakpi form Kecamatan terlebih dahulu")
      setIsLoading(false)
      return
    }    
    if(isDropship?.label === ""){
      await alertWarning("Warnings", "Mohon lengakpi form Dropship terlebih dahulu")
      setIsLoading(false)
      return
    }    
    const resConfirmation = await alertQuestion("Confirmation", "Yakin ingin menambahkan alamat baru?")
    if(resConfirmation){
      const res = await tambahAlamat(penerima, alamat, provinsi?.label, kota?.label, kecamatan?.label, phone, isDropship?.value, kecamatan?.value, toko)
      if(res){
        setIsLoading(false)
        await alertSuccess("Terima Kasih", "Data alamat kamu berhasil ditambahkan")
        setTampil(false)
        return
      }
      else{
        await alertError("Terjadi Kesalahan", "Mohon maaf terjadi kesalahan sistem")
        setIsLoading(false)
        return
      }
    }
    else{
      setIsLoading(false)  
      return
    }
  }

  if(loadingProvinsi){
    return(
      <>
        <Loading></Loading>
      </>
    )
  }
  else{  
    return(
      <>
        <div className="w-full">
          <div className="my-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Penerima
              </label>
              <div>
                <input onChange={(e)=>setPenerima(e?.target?.value)} value={penerima} type="text" placeholder={"Cantumkan nama penerima"} className="w-full p-3 pr-0 ring-1 ring-gray-400 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              </div>            
            </div>
          </div>
          <div className="my-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Toko
              </label>
              <div>
                <input onChange={(e)=>setToko(e?.target?.value)} value={toko} type="text" placeholder={"Cantumkan nama toko"} className="w-full p-3 pr-0 ring-1 ring-gray-400 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              </div>            
            </div>
          </div>
          <div className="my-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Handphone
              </label>
              <div>
                <input onChange={(e)=>setPhone(e?.target?.value)} value={phone} type="number" placeholder={"Cantumkan no handphone"} className="w-full p-3 pr-0 ring-1 ring-gray-400 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              </div>            
            </div>
          </div>
          
          <div className="my-6">
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

          <div className="my-6">
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

          <div className="my-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kecamatan
            </label>

            <Select
              value={kecamatan}
              placeholder=""
              onChange={(value)=>setKecamatan(value)}
              options={listDesa}
            />
          </div>

          <div className="my-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kamu Dropship?
            </label>

            <Select
              value={isDropship}
              placeholder=""
              onChange={(value)=>setIsDropship(value)}
              options={listDropship}
            />
          </div>

          <div className="my-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea className="pl-2 py-2 ring-1 ring-gray-400 rounded w-full h-20" onChange={(e)=>setAlamat(e?.target?.value)} value={alamat}></textarea>
          </div>

          <div className="my-6">
            <button onClick={handlerClickTambahAlamat} className="w-full rounded bg-blue-500  font-semibold hover:bg-blue-600 text-white py-3">
              {(isLoading)?"Loading..":"Tambah Alamat +"}
            </button>
            
            <button onClick={()=>setTampil(false)} className="w-full rounded bg-white  font-semibold text-blue-500 ring-1 ring-blue-500 mt-3 py-3">
              Cancel
            </button>            

          </div>

        </div>
      </>
    )
  }
}