import React, {useEffect, useMemo, useState} from 'react'

import loadable from '@loadable/component'
import {useRouter} from 'next/router'
import {useProductRetailDetail} from '../../api/get'
import { convertToRp, listChooseBankForRetail, replaceKomaWithDot } from '../../helper/converter'
import { alertError, alertQuestion, alertSuccess, alertWarning } from '../../helper/sweetalert'
import { useStorePIN } from '../../store/pin-store'
import { useStoreModal, useTemplateTipeModal } from '../../store/modal-store'
import { paymnetHandlerForRetail } from '../../api/post'
import { getStatusUser } from '../../helper/localStorage'
import { useStatusUser } from '../../store/status-store'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))
const Loading = loadable(()=>import("../../components/Loading-Component"))
const NotFound = loadable(()=>import("../../components/NotFound-Component"))
const Image = loadable(()=>import("../../components/ImageLazy-Component"))
const Select = loadable(()=>import("react-select"))

export default function DetailRetail(){

  const router = useRouter()  

  const {statusUserStore} = useStatusUser()    

  const {pinStore, confirmPIN, clearPINStore} = useStorePIN()
  const {showModal, modal} = useStoreModal()
  const {changeTipeModal} = useTemplateTipeModal()

  const [idProduct, setIdProduct] = useState(-1);

  const {resProductRetailDetail,loadingProductRetailDetail, notFoundProductRetailtDetail} = useProductRetailDetail(idProduct)     

  const [isClick, setIsClick] = useState(false);

  const [qty, setQty] = useState(0);

  const [tipePembayaran, setTipePembayaran] = useState(1);

  const [bank, setBank] = useState("");

  useEffect(()=>{
    const { id } = router.query
    if(id == null){
      if(typeof window !== "undefined"){        
        const tmpid = window.location.href.split("/")[4];                
        setIdProduct(tmpid)
        return
      } 
    }
    setIdProduct(id)
    return
  },[])

  const renderSelectMetodePembayaran = useMemo(()=>{
    if(tipePembayaran === 1){
      return(
        <div className="my-5">
          <div className="mb-2">
            <span>Metode Pembayaran</span>                    
          </div>
          <Select options={listChooseBankForRetail()} value={bank} onChange={(value)=>setBank(value)}></Select>
        </div>
      )
    }
    else{
      return null
    }
  },[tipePembayaran, bank])

  const calculateStok = useMemo(()=>{
    const resCalcu = parseInt(resProductRetailDetail?.stok) - qty  
    if(resCalcu < 0) return 0
    return resCalcu
  },[qty, resProductRetailDetail])

  const calcuTotal = useMemo(()=>{
    if(tipePembayaran === 1){
      return convertToRp(resProductRetailDetail?.price_rp * qty)
    }
    else if(tipePembayaran === 2){
      return parseFloat(replaceKomaWithDot(resProductRetailDetail?.price_btc)) * qty
    }
    else if(tipePembayaran === 3){
      return parseFloat(replaceKomaWithDot(resProductRetailDetail?.price_eth)) * qty
    }
    else if(tipePembayaran === 4){
      return parseFloat(replaceKomaWithDot(resProductRetailDetail?.price_xrp)) * qty
    }
  },[qty, resProductRetailDetail, tipePembayaran])

  const handlerPayment = async () => {
    const res = await paymnetHandlerForRetail(resProductRetailDetail?.id, (resProductRetailDetail?.price_rp * qty), pinStore)
    if(res?.status){
      await alertSuccess("Berhasil", "Pembelian retail kamu berhasil!")
      clearPINStore()
      router.push("/srec")
      return
    }    
    clearPINStore()
    await alertError("Oppppss", res?.data)
    return
  }

  useEffect(()=>{
    if(!modal){
      setIsClick(false)
    }
  },[modal])

  useEffect(()=>{
    if(confirmPIN){
      handlerPayment()
    }   
  },[confirmPIN])

  const handlerBeliSekarang = async () => {    

    if( getStatusUser() != "4"){
      router.push("/complete")
      return
    }

    if(isClick) return
    setIsClick(true)

    if(resProductRetailDetail?.stok <= 0 || qty > resProductRetailDetail?.stok ){
      await alertWarning("Peringatan", "Stok yang tersedia tidak cukup")      
      setIsClick(false)
      return
    }       

    if(qty<=0){
      await alertWarning("Peringatan", "Stok Pembelian harus lebih dari 1 ")      
      setIsClick(false)
      return
    }

    if(tipePembayaran === 1 && bank === ""){
      await alertWarning("Peringatan", "Metode Pembayaran belum di pilih")      
      setIsClick(false)
      return
    }

    const resQuestion = await alertQuestion("Confirmation", `[${resProductRetailDetail?.title}-${convertToRp(resProductRetailDetail?.price_rp)}]?`, "Lanjutkan!!")

    if(resQuestion){
      changeTipeModal("pin")
      showModal()
    }else{
      setIsClick(false)
      return
    }
  }

  const handlerChangeQTY = async (e) => {
    if((resProductRetailDetail?.stok - parseInt(e)) < 0){
      await alertWarning("Peringatan", "Slot yang tersedia tidak cukup")      
      setQty(0)
      return 
    }
    else if(parseInt(e)<0){
      await alertWarning("Peringatan", "Stok pembelian tidak boleh kurang dari 0")      
      setQty(0)
      return 
    }
    setQty(e)
  }  

  if(loadingProductRetailDetail){
    return(
      <Wrapper title="Detail Product Invest - SCProperty" description="Page ini akan menampilkan detail project investment di sc property">
        <Loading></Loading>
      </Wrapper>
    )
  }
  else if(notFoundProductRetailtDetail){
    return(
      <Wrapper title="Detail Product Invest - SCProperty" description="Page ini akan menampilkan detail project investment di sc property">
        <NotFound></NotFound>
      </Wrapper>
    )
  }
  else{
    return(
      <Wrapper title="Detail Product Invest - SCProperty" description="Page ini akan menampilkan detail project investment di sc property">
        <div className="px-5 lg:px-14 md:mt-10 mt-4">
          <div className="flex flex-wrap mb-20">  
            <div className="w-full xl:w-1/4 lg:hidden xl:block">
              <div className="">
                <Image className="w-full rounded-lg object-cover" src={resProductRetailDetail?.image} ></Image>
              </div>             
            </div>
            <div className="w-full xl:w-2/4 lg:w-3/5">
              <div className="hidden lg:block xl:hidden">
                <div className="">
                  <Image className="w-full rounded-lg object-cover" src={resProductRetailDetail?.image} ></Image>
                </div>             
              </div>
              <div className="xl:px-10">
                <div className="text-lg mb-1">
                  <span>{`Retail - ${resProductRetailDetail?.title}`}</span>
                </div>
                <div className="text-sm font-light text-blue-500 mb-5">
                  <span>{`Stok (${resProductRetailDetail?.stok})`}</span>
                </div>
                <div className="text-4xl font-bold mb-10">
                  <span>{`${convertToRp(resProductRetailDetail?.price_rp)}`}</span>
                </div>
                <div className="text-xl text-gray-800 font-bold">
                  <span>Description</span>
                </div>                
                <div className="w-full mt-5 flex flex-wrap">
                  <div className="w-1/2">
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800">Kamar Mandi</p>
                      <p>{resProductRetailDetail?.kamar_mandi} - Kamar</p>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800">Kamar Tidur</p>
                      <p>{resProductRetailDetail?.kamar_tidur} - Kamar</p>
                    </div>                                   
                  </div>
                  <div className="w-1/2">                    
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800">Jumlah Lantai</p>
                      <p>{resProductRetailDetail?.jumlah_lantai} - Lantai</p>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800">Luas Tanah</p>
                      <p>{resProductRetailDetail?.luas_tanah} - M<sup>2</sup> </p>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/4 lg:w-2/5 mt-20 lg:mt-0">
              <div className="lg:shadow-xl lg:p-7 rounded">
                <div className="text-2xl font-semibold">
                  <span>Atur Pembelian</span>
                </div>
                
                <div className="text-xs mt-1" >
                  <span>Section ini akan memberikan kamu akses untuk mengatur pembelian pada produk</span>
                </div>                

                <div className="text-sm text-gray-500 text-justify mt-5" >
                  <span>Sisa Stok</span>
                </div>
                <div className="text-base font-bold mb-1">
                  <span>{`${calculateStok} item`}</span>
                </div>                                 

                <div className="text-sm text-gray-500 text-justify mt-5" >
                  <span>Total Tagihan</span>
                </div>
                <div className="text-xl font-bold mb-1">
                  <span>{`${calcuTotal}`}</span>
                </div>                 

                <div className="my-5">
                  <div className="mb-2">
                    <span>Stok Pembelian</span>
                  </div>
                  <input value={qty} onChange={(e)=>handlerChangeQTY(e.target.value)} className="w-full p-2 rounded hover:border-yellow-300 ring-1 ring-gray-400" type="number"></input>
                </div>    

                <div className="my-5 grid grid-cols-4 gap-2 text-center text-white">
                  <button onClick={()=>setTipePembayaran(1)} className={`${(tipePembayaran===1)?"bg-green-500 py-1 px-2 rounded":"bg-white text-green-500 ring-1 ring-green-500 rounded"}`}>RP</button>
                  <button onClick={()=>setTipePembayaran(2)} className={`${(tipePembayaran===2)?"bg-green-500 py-1 px-2 rounded":"bg-white text-green-500 ring-1 ring-green-500 rounded"}`}>BTC</button>
                  <button onClick={()=>setTipePembayaran(3)} className={`${(tipePembayaran===3)?"bg-green-500 py-1 px-2 rounded":"bg-white text-green-500 ring-1 ring-green-500 rounded"}`}>ETH</button>
                  <button onClick={()=>setTipePembayaran(4)} className={`${(tipePembayaran===4)?"bg-green-500 py-1 px-2 rounded":"bg-white text-green-500 ring-1 ring-green-500 rounded"}`}>XRP</button>
                </div>            

                {renderSelectMetodePembayaran}

                <button onClick={handlerBeliSekarang} className="mt-2 w-full bg-green-600 hover:bg-green-500 rounded text-white font-semibold p-3">
                  {(isClick)?"Loading..":"Beli Sekarang"}
                </button>                                    
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}