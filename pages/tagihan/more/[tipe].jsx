import loadable from "@loadable/component"
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { handlerBillIndihome, handlerBillTagihanListrik } from "../../../api/get";
import { listFiturMenuLain } from "../../../helper/data"
import { alertError, alertSuccess, alertWarning } from "../../../helper/sweetalert";

const Wrapper = loadable(()=>import('../../../components/Wrapper-Component'))
const Select = loadable(()=>import('react-select'))

const konstanFormTagihanListrik = {isShow:false, message:"", isError:false}
const konstanFormTagihanIndihome = {isShow:false, message:"", isError:false}

export default function MoreLandingPage(){

  const {query} = useRouter()

  const [choosedFitur, setChoosedFitur] = useState([]);

  const [isClickPLN, setIsClickPLN] = useState(false);
  const [isClickIndihome, setIsClickIndihome] = useState(false);

  const [idpl, setIdpl] = useState("");
  const [idplIndiHome, setIdplIndiHome] = useState("");

  const [formTagihanListrik, setFormTagihanListrik] = useState({isShow:false, message:"", isError:false});
  const [formTagihanIndihome, setFormTagihanIndihome] = useState({isShow:false, message:"", isError:false});

  useEffect(()=>{    
    if(query?.tipe == null) return
    if(query?.tipe == "pln"){
      setChoosedFitur({value:1, label:"Tagihan Listrik"})
    }
    else if(query?.tipe == "indihome"){
      setChoosedFitur({value:2, label:"Paket Internet"})
    }
  },[query?.tipe])

  const handlerChangeTagihanListrik = async (value) => {

    if(value?.length > 11) return

    if(value?.length < 11){
      konstanFormTagihanListrik.isShow = false
      konstanFormTagihanListrik.isError = false,
      konstanFormTagihanListrik.message = ""
      setFormTagihanListrik(konstanFormTagihanListrik)
    }

    setIdpl(value)

    if(value?.length === 11){    
      
      setIsClickPLN(true)
      
      const res = await handlerBillTagihanListrik(idpl)      
      
      if(!res?.status){        
        konstanFormTagihanListrik.isError = true,
        konstanFormTagihanListrik.message = res?.data?.message
        konstanFormTagihanListrik.isShow = true        
        setFormTagihanListrik(konstanFormTagihanListrik)   
        setIsClickPLN(false)     
        return
      }      

      konstanFormTagihanListrik.isError = false,
      konstanFormTagihanListrik.message = res?.data?.message
      konstanFormTagihanListrik.isShow = true      
      setFormTagihanListrik(konstanFormTagihanListrik)
      setIsClickPLN(false)
      return

    }    

  }

  const handlerChangeTagihanIndihome = async (value) => {

    if(value?.length > 12) return

    if(value?.length < 12){
      konstanFormTagihanIndihome.isShow = false
      konstanFormTagihanIndihome.isError = false,
      konstanFormTagihanIndihome.message = ""
      setFormTagihanIndihome(konstanFormTagihanIndihome)
    }

    setIdplIndiHome(value)

    if(value?.length === 12){    
      
      setIsClickIndihome(true)
      
      const res = await handlerBillIndihome(idplIndiHome)
      
      if(!res?.status){        
        konstanFormTagihanIndihome.isError = true,
        konstanFormTagihanIndihome.message = res?.data?.message
        konstanFormTagihanIndihome.isShow = true        
        setFormTagihanIndihome(konstanFormTagihanIndihome)   
        setIsClickIndihome(false)     
        return
      }      

      konstanFormTagihanIndihome.isError = false,
      konstanFormTagihanIndihome.message = res?.data?.message
      konstanFormTagihanIndihome.isShow = true      
      setFormTagihanIndihome(konstanFormTagihanIndihome)
      setIsClickIndihome(false)
      return

    }    

  }

  const handlerClickTagihanListrik = async () => {

    if(isClickPLN) return

    setIsClickPLN(true)

    if(idpl?.length !== 11){
      alertWarning("Oooopsss", "Mohon lengkapi terlebih dahulu ID Pelanggan atau No Meter nya yaa")
      setIsClickPLN(false)
      return
    }
    
    setIsClickPLN(false)
    return
  }

  const handlerClickTagihanIndihome = async () => {

    if(isClickIndihome) return

    setIsClickIndihome(true)

    if(idplIndiHome?.length !== 11){
      alertWarning("Oooopsss", "Mohon lengkapi terlebih dahulu ID Pelanggan atau No Meter nya yaa")
      setIsClickIndihome(false)
      return
    }
    
    setIsClickIndihome(false)
    return
  }

  const handlerChangeSelectTipeFitur = (e) => {
    konstanFormTagihanIndihome.isShow = false
    konstanFormTagihanIndihome.isError = false,
    konstanFormTagihanIndihome.message = ""
    konstanFormTagihanListrik.isShow = false
    konstanFormTagihanListrik.isError = false,
    konstanFormTagihanListrik.message = ""
    setFormTagihanListrik(konstanFormTagihanListrik)
    setFormTagihanIndihome(konstanFormTagihanIndihome)
    setChoosedFitur(e)
    setIdpl("")
    setIdplIndiHome("")
  }


  const renderForm = useMemo(()=>{
    if(choosedFitur?.value === 1){
      return(
        <>          
          <p className="text-xl text-gray-800 mt-5">Form Tagihan Listrik</p>
          <p className="text-gray-800 mb-5 text-xs">Form ini akan memberikan kamu akses untuk memasukan ID Pelanggan atau No Meter yang nanti dapat digunakan untuk melakukan pembayaran</p>
          <div className="flex w-full">            
            <input type="number" value={idpl} onChange={(e)=>handlerChangeTagihanListrik(e?.target?.value)} placeholder="No Meter/ID Pelanggan" className="flex-1 text-sm text-gray-800 border focus:outline-none py-2 px-2 border-green-400 rounded-l" />
            <button onClick={handlerClickTagihanListrik} className="bg-green-400 text-sm text-center px-4 rounded-r  text-white font-semibold hover:bg-green-500">
              {isClickPLN?"Loading..":"Bayar"}
            </button>
          </div>
        </>
      )
    }
    else if(choosedFitur?.value === 2){
      return(
        <>          
          <p className="text-xl text-gray-800 mt-5">Form Tagihan Internet (Indihome)</p>
          <p className="text-gray-800 mb-5 text-xs">Form ini akan memberikan kamu akses untuk memasukan ID Pelanggan yang nanti dapat digunakan untuk melakukan pembayaran</p>
          <div className="flex w-full">            
            <input type="number" value={idplIndiHome} onChange={(e)=>handlerChangeTagihanIndihome(e?.target?.value)} placeholder="No Meter/ID Pelanggan" className="flex-1 text-sm text-gray-800 border focus:outline-none py-2 px-2 border-green-400 rounded-l" />
            <button onClick={handlerClickTagihanIndihome} className="bg-green-400 text-sm text-center px-4 rounded-r  text-white font-semibold hover:bg-green-500">
              {isClickIndihome?"Loading..":"Bayar"}
            </button>
          </div>
        </>
      )
    }
  },[choosedFitur, idpl, isClickPLN, idplIndiHome, isClickIndihome])

  const renderKeterangan = useMemo(()=>{    
    if(choosedFitur?.value === 1 && formTagihanListrik?.isShow){            
      return(
        <>
          <div className={`rounded border ${formTagihanListrik?.isError?"border-red-400":"border-green-400"} p-4 mt-4`}>
            {formTagihanListrik?.message}
          </div>  
        </>
      )
    }
    else if(choosedFitur?.value === 2 && formTagihanIndihome?.isShow){            
      return(
        <>
          <div className={`rounded border ${formTagihanIndihome?.isError?"border-red-400":"border-green-400"} p-4 mt-4`}>
            {formTagihanIndihome?.message}
          </div>  
        </>
      )
    }
    else{
      return null
    }
  },[choosedFitur, formTagihanListrik?.isShow, formTagihanListrik?.isError, formTagihanListrik?.message, formTagihanIndihome?.isShow, formTagihanIndihome?.isError, formTagihanIndihome?.message])

  return(
    <Wrapper index={7} title={'Menu Lain - ScProperty'} description={'Menu ini akan menampilkan segala kebutuhan lain nya yang ditawarkan oleh scproperty sebagai menu tambahan'}>
      <div className="px-4 md:px-8 lg:px-12 xl:px-14 mt-4 md:mt-10">
        <p className="text-3xl text-gray-800 font-semibold">Beli <span className="font-thin text-green-500">produk digital</span> di SCProperty</p>
        <p className="text-gray-800">Mulai dari tagihan listrik hingga paket internet</p>

        <p className="text-gray-800 text-sm mt-5 mb-1 font-semibold">Pilih Layanan</p>      
        <Select options={listFiturMenuLain()} value={choosedFitur} onChange={(e)=>(handlerChangeSelectTipeFitur(e))}></Select>

        <div className="border border-gray-100 w-full mt-5"></div>

        {renderForm}
        
        {renderKeterangan}
      </div>

    </Wrapper>
  )
}