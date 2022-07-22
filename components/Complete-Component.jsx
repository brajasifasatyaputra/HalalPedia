import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import loadable from '@loadable/component'

import {useProvinsi, useKota, useDesa, getUserPhone} from '../api/get'
import {createPIN, completeProfile} from '../api/post'
import { alertSuccess, alertError, alertWarning, alertQuestion} from '../helper/sweetalert';
import { listGender } from '../helper/converter'
import { useStatusUser } from '../store/status-store'

const Wrapper = loadable(()=>import("./Wrapper-Component"));
const Loading = loadable(()=>import("./Loading-Component"))
const Select = loadable(()=>import('react-select'))

export default function CompleteComponent(){

  const router = useRouter()

  const {checkingFromOnline} = useStatusUser()  
  
  const [phone, setPhone] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [desa, setDesa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ktp, setKtp] = useState("");
  const [npwp, setNpwp] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [gender, setGender] = useState("");  
  const [imageKTP, setImageKTP] = useState(null);
  const [imageAddressKTP, setImageAddressKTP] = useState(null);
  const inputRefUploadKTP = React.useRef(null);
  const [imageKTPFace, setImageKTPFace] = useState(null);
  const [imageAddressKTPFace, setImageAddressKTPFace] = useState(null);
  const inputRefUploadKTPFace = React.useRef(null);
  const [imageNPWP, setImageNPWP] = useState(null);
  const [imageAddressNPWP, setImageAddressNPWP] = useState(null);
  const inputRefUploadNPWP = React.useRef(null);
  const [isClick, setIsClick] = useState(false);
  const [pin, setPin] = useState("");
  const [pinConfirmation, setPinConfirmation] = useState("");
  const [listKota, setListKota] = useState([]);
  const [listDesa, setListDesa] = useState([]);

  const [staButton, setStaButton] = useState(true);

  const {loadingProvinsi, resProvinsi} = useProvinsi();    

  const atClickUploadKTPHandler = () => inputRefUploadKTP.current?.click();
  
  const atChangeImageKTP = (e) => {
  
    const fileStrem = e.target?.files[0];   
    setImageKTP(fileStrem);
    const reader = new FileReader();        
    reader.onloadend = () => {      
      setImageAddressKTP(reader?.result);
    }    
    reader.readAsDataURL(fileStrem);  
  }

  const atClickUploadKTPFaceHandler = () => inputRefUploadKTPFace.current?.click();
  
  const atChangeImageKTPFace = (e) => {
  
    const fileStrem = e.target?.files[0];   
    setImageKTPFace(fileStrem);
    const reader = new FileReader(); 
    reader.onloadend = () => {
      setImageAddressKTPFace(reader?.result);
    }           
    reader.readAsDataURL(fileStrem);  
  }

  const atClickUploadNPWPHandler = () => inputRefUploadNPWP.current?.click();
  
  const atChangeNPWP = (e) => {
  
    const fileStrem = e.target?.files[0];   
    setImageNPWP(fileStrem);
    const reader = new FileReader();        
    reader.onloadend = () => {
      setImageAddressNPWP(reader?.result);
    }    
    reader.readAsDataURL(fileStrem);  
  }

  const handlerAtSendKelengkapanData = async () => {
    
    setIsClick(true);
    
    if(phone === ""||ktp === ""  || npwp === ""  || alamat === ""  || tanggalLahir === ""  || provinsi === ""  || kota === ""  || desa === ""  || imageKTP === null  || imageNPWP === null   || imageKTPFace === null   || pin === ""  || pinConfirmation === ""){
      await alertWarning("Maaf", "Mohon lengkapi form telebih dahulu yaaa :)");
      setIsClick(false)
      return;
    }

    if(pin.length !== 6){
      await alertWarning("Maaf", "Pin yang dimasukan harus memiliki panjang 6 karakter");
      setIsClick(false)
      return;
    }

    if(pin !== pinConfirmation){
      await alertWarning("Maaf", "Pin yang dimasukan tidak cocok dengan Pin Confirmation");
      setIsClick(false)
      return;
    }      
    const comfirmCompleteProfile = await alertQuestion("Confirmation!!", "Apakah kamu yakin dengan data yang kamu kirim?", "Kirim sekarang!")

    if(!comfirmCompleteProfile){      
      setIsClick(false)                                           
      return;
    }

    const resPIN = await createPIN(pin, pinConfirmation);
    const resProfile = await completeProfile(phone,gender?.value, tanggalLahir, provinsi?.value, kota?.value, desa?.value, alamat, ktp, imageKTP, imageKTPFace, npwp, imageNPWP);    

    if(!resPIN){
      await alertError("Terjadi Kesalahan", resPIN?.res?.data?.message);
      setIsClick(false)                                           
      return;
    }

    if(!resProfile){
      await alertError("Terjadi Kesalahan", resProfile.res?.data?.message);
      setIsClick(false)                                           
      return;
    }
    
    await checkingFromOnline()

    await alertSuccess("Selamat", "Pengajuan kelengkapan profilemu telah berhasil!")
    setIsClick(false)    
    router.push("/")
    return;


  }

  const handlerGetKota = async (id) => {
    return await useKota(id)
  }

  const handlerGetDesa = async (id) => {
    return await useDesa(id)
  }

  useEffect(()=>{
    (async()=>{
      const res = await getUserPhone()
      console.log(res)
      if(res == null || res === ""){
        setPhone("")
        setStaButton(false)
        return
      }
      setPhone(res)
      setStaButton(true)
      return
    })()
  },[])

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

  if(loadingProvinsi){
    return(
      <Wrapper title={"Complete Profile - SC Property Indonesia"} description={"Page ini berisi form untuk melengkapi profile user yang dibutuhkan oleh SC Property Indonesia"}>
        <Loading></Loading>
      </Wrapper>
    );
  }

  else{
    return(
      <Wrapper title={"Complete Profile - SC Property Indonesia"} description={"Page ini berisi form untuk melengkapi profile user yang dibutuhkan oleh SC Property Indonesia"}>
        <div className="mt-5 md:px-14 px-5">
          
          <div className="">
            <div className="">
              <h3 className="text-3xl font-semibold">Form Kelengkapan Profile Nasabah</h3>
              <p className="mt-1 text-sm text-gray-800">
                Form ini digunakan untuk memasukan kelengkapan profile nasabah
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
       
            <div className="">
              <div className="py-5 bg-white space-y-6">
                <div className="grid grid-cols-3 gap-6">          

                  <div className="col-span-12">
                    <label  className="text-sm text-gray-800">
                      Phone Number
                    </label>
                    <input disabled value={phone} onChange={(e)=>setPhone(e?.target?.value)} className="mt-2 w-full py-2 px-2 border-gray-300  border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"/>
                    {(!staButton)?(
                      <span className="text-xs text-red-400 mt-1 italic">*Untuk melengkapi profile kamu harus memverifikasi no telp terlebih dahulu mohon check Whatsapp kamu yaa</span>
                    ):null}
                  </div>                          

                  <div className="col-span-12">
                    <label className="text-sm  text-gray-800 mb-1">
                      Gender
                    </label>
                    <Select                      
                      value={gender}
                      placeholder=""
                      onChange={(value)=>setGender(value)}
                      options={listGender()}                      
                    />                  
                  </div>

                  <div className="col-span-12">
                    <label className="text-sm text-gray-800 mb-1">
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
                    <label  className="text-sm text-gray-800 mb-1">
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
                    <label className="text-sm text-gray-800 mb-1">
                      Kecamatan
                    </label>
    
                    <Select
                      value={desa}
                      placeholder=""
                      onChange={(value)=>setDesa(value)}
                      options={listDesa}
                    />
                  </div>

                  <div className="col-span-12">
                    <label  className="text-sm text-gray-800">
                      Alamat
                    </label>
                    <textarea className="mt-2 w-full py-2 px-2 border-gray-300  border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400" value={alamat} onInput={(e)=>setAlamat(e.target.value)}></textarea>
                  </div>

                  <div className="col-span-12">
                    <label  className="text-sm text-gray-800">
                      Tanggal Lahir
                    </label>
                    <input value={tanggalLahir} onInput={(v)=>{setTanggalLahir(v.target.value) }} type="date" placeholder="Ex: 2002-01-04"  className="mt-2 w-full py-2 px-2 border-gray-300  border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"/>
                  </div>

                  <div className="col-span-12">
                    <label  className="text-sm text-gray-800">
                      No KTP
                    </label>
                    <input value={ktp} onInput={(v)=>{setKtp(v.target.value) }} type="number" placeholder="Ex:5219***"  className="mt-2 w-full py-2 px-2 border-gray-300  border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"/>
                  </div>

                  <div className="col-span-12">
                    <label  className="text-sm text-gray-800">
                      No NPWP
                    </label>
                    <input value={npwp} onInput={(v)=>{setNpwp(v.target.value) }} type="number" placeholder="Ex:11133***"  className="mt-2 w-full py-2 px-2 border-gray-300  border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"/>
                  </div>

                </div>
                
    
                <div>
                  
                  <div className="mt-1 flex items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Foto KTP
                    </label>
                  
                    <button onClick={atClickUploadKTPHandler}  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                      Pilih Foto
                    </button>
                    <input  onChange={atChangeImageKTP} accept="image/*" ref={inputRefUploadKTP} type="file" hidden/>
                  </div>

                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    {imageAddressKTP?
                      <img height={270} width={270} src={imageAddressKTP} />   
                    :                    
                      <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    
                      <p className="text-xs text-gray-500">
                        PNG or JPG up to 10MB
                      </p>
                    </div>}
                  </div>

                  <div className="mt-1 flex items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Foto KTP Dengan Wajah
                    </label>
                  
                    <button onClick={atClickUploadKTPFaceHandler}  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                      Pilih Foto
                    </button>
                    <input  onChange={atChangeImageKTPFace} accept="image/*" ref={inputRefUploadKTPFace} type="file" hidden/>
                  </div>

                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    {imageAddressKTPFace?
                      <img height={270} width={270} src={imageAddressKTPFace} />   
                    :                    
                      <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    
                      <p className="text-xs text-gray-500">
                        PNG or JPG up to 10MB
                      </p>
                    </div>}
                  </div>

                  <div className="mt-1 flex items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Foto NPWP
                    </label>
                  
                    <button onClick={atClickUploadNPWPHandler}  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                      Pilih Foto
                    </button>
                    <input  onChange={atChangeNPWP} accept="image/*" ref={inputRefUploadNPWP} type="file" hidden/>
                  </div>

                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    {imageAddressNPWP?
                      <img height={270} width={270} src={imageAddressNPWP}/>   
                    :                    
                      <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    
                      <p className="text-xs text-gray-500">
                        PNG or JPG up to 10MB
                      </p>
                    </div>}
                  </div>

                </div>

                <div className="grid grid-cols-3 gap-6">
                  
                  <div className="col-span-12">
                    <label  className="block text-sm font-medium text-gray-700">
                      PIN
                    </label>
                    <input value={pin} onInput={(v)=>{setPin(v.target.value) }} type="password" placeholder="Ex:123***"  className="mt-2 w-full py-2 px-2 border-gray-300  border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"/>
                    <span className="text-xs text-red-400 mt-1 italic">PIN must be 6 character</span>
                  </div>
                  
                  <div className="col-span-12">
                    <label  className="block text-sm font-medium text-gray-700">
                      PIN Confirmation
                    </label>
                    <input value={pinConfirmation} onInput={(v)=>{setPinConfirmation(v.target.value) }} type="password" placeholder="Ex:123***"  className="mt-2 w-full py-2 px-2 border-gray-300  border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"/>                    
                  </div>
                </div>

            </div>            
            
            {
              (staButton)?(
                <div className="pb-7 pt-0 text-left">
                  <button onClick={handlerAtSendKelengkapanData} className="inline-flex font-semibold justify-center py-2 px-4 text-sm rounded text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    {(isClick)?"Loading..":"Kirim Kelengkapan Profile"}
                  </button>
                </div>
              ):null
            }

            </div>
         
          </div>
        </div>
      </Wrapper>
    );
  }
}