import React, {useEffect, useMemo, useState} from 'react'

import loadable from '@loadable/component'
import {useRouter} from 'next/router'
import {useProductInvestDetail} from '../../api/get'
import { convertToRp } from '../../helper/converter'
import { alertError, alertQuestion, alertSuccess, alertWarning } from '../../helper/sweetalert'
import { useStorePIN } from '../../store/pin-store'
import { useStoreModal, useTemplateTipeModal } from '../../store/modal-store'
import { paymentHandlerForInvestment } from '../../api/post'
import { getStatusUser, getUserWadiah } from '../../helper/localStorage'
import { useStatusUser } from '../../store/status-store'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))
const Loading = loadable(()=>import("../../components/Loading-Component"))
const NotFound = loadable(()=>import("../../components/NotFound-Component"))
const Image = loadable(()=>import("../../components/ImageLazy-Component"))
const Progress = loadable(()=>import("../../components/Progress-Component"))

export default function DetailInvestment(){

  const router = useRouter()  

  const {statusUserStore} = useStatusUser()  

  const {pinStore, confirmPIN, clearPINStore} = useStorePIN()
  const {showModal, modal} = useStoreModal()
  const {changeTipeModal} = useTemplateTipeModal()

  const [idProduct, setIdProduct] = useState(-1);

  const {resProductInvestDetail, loadingProductInvestDetail, notFoundProductInvestDetail} = useProductInvestDetail(idProduct)    

  // const [navigationButton, setNavigationButton] = useState(1);        

  const [isClick, setIsClick] = useState(false);

  const [qty, setQty] = useState(0);

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

  const calculateStok = useMemo(()=>{
    const resCalcu = parseInt(resProductInvestDetail?.lot_available) - qty  
    if(resCalcu < 0) return 0
    return resCalcu
  },[qty, resProductInvestDetail])

  const calcuTotal = useMemo(()=>{
    return resProductInvestDetail?.price * qty
  },[qty, resProductInvestDetail])

  const handlerPayment = async () => {
    const res = await paymentHandlerForInvestment(resProductInvestDetail?.id, calcuTotal, pinStore)
    if(res?.status){
      await alertSuccess("Berhasil", "Pembelian aset investasi kamu berhasil!")
      clearPINStore()
      router.push("/invest")
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

    if(getStatusUser() != "4"){
      router.push("/complete")
      return
    }

    if(isClick) return
    setIsClick(true)

    if(resProductInvestDetail?.lot_available <= 0 || qty > resProductInvestDetail?.lot_available){
      await alertWarning("Peringatan", "Slot yang tersedia tidak cukup")      
      setIsClick(false)
      return
    }    

    if(qty < 0){
      await alertWarning("Peringatan", "Stok Pembelian harus lebih dari 1 ")      
      setIsClick(false)
      return
    }

    if(parseInt(getUserWadiah()) < calcuTotal){
      await alertWarning("Peringatan", "Saldo kamu tidak mencukupi untuk transaksi ini!")      
      setIsClick(false)
      return
    }

    const resQuestion = await alertQuestion("Confirmation", `[${resProductInvestDetail?.title}-${convertToRp(resProductInvestDetail?.price)}]?`, "Lanjutkan!!")

    if(resQuestion){
      changeTipeModal("pin")
      showModal()
    }else{
      setIsClick(false)
      return
    }


  }

  const handlerChangeQTY = async (e) => {
    if((resProductInvestDetail?.lot_available - parseInt(e)) < 0){
      await alertWarning("Peringatan", "Slot yang tersedia tidak cukup")      
      setQty(0)
      return 
    }
    setQty(e)
  }

  const renderUnduhProkpektus = useMemo(()=>{
    if(resProductInvestDetail?.project_docs?.appraisal == null) return null
    else{
      return(
        <div className="mb-5">
          <a href={resProductInvestDetail?.project_docs?.appraisal?.appraisal_doc_url} target="_blank" rel="noopener noreferrer">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold text-sm w-full py-2 px-4 rounded">
              UNDUH PROSPEKTUS
            </button>
          </a>
        </div>
      )
    }
  },[resProductInvestDetail])

  // const renderTab = useMemo(()=>{
  //   if(navigationButton === 1){
  //     return(
  //       <DetailComponent data={resProductInvestDetail}></DetailComponent>
  //     )
  //   }
  //   else if(navigationButton === 2){
  //     return(
  //       <FiturComponent data={resProductInvestDetail?.project_docs?.fitur}></FiturComponent>
  //     )
  //   }
  //   else if(navigationButton === 3){
  //     return(
  //       <LegalitasComponent data={resProductInvestDetail?.project_docs?.legalitas}></LegalitasComponent>
  //     )
  //   }
  //   else if(navigationButton === 4){
  //     return(
  //       <AppraisalComponent data={resProductInvestDetail?.project_docs?.appraisal}></AppraisalComponent>
  //     )
  //   }
  //   else{
  //     return null
  //   }
  // },[navigationButton, resProductInvestDetail])

  if(loadingProductInvestDetail){
    return(
      <Wrapper title="Detail Product Invest - SCProperty" description="PagerenderUnduhProkpektus ini akan menampilkan detail project investment di sc property">
        <Loading></Loading>
      </Wrapper>
    )
  }
  else if(notFoundProductInvestDetail){
    return(
      <Wrapper title="Detail Product Invest - SCProperty" description="Page ini akan menampilkan detail project investment di sc property">
        <NotFound></NotFound>
      </Wrapper>
    )
  }
  else{
    return(
      <Wrapper title="Detail Product Invest - SCProperty" description="Page ini akan menampilkan detail project investment di sc property">
        <div className="lg:px-14 px-5 md:mt-10 mt-4">
          <div className="flex flex-wrap mb-20">  
            <div className="w-full xl:w-1/4 lg:hidden xl:block">              
              <div className="">
                <Image alt={"Image"} className="w-full rounded-lg object-cover" src={resProductInvestDetail?.image} ></Image>
              </div>
              <div className="mt-10 mb-2">
                <div className="flex justify-between">
                  <p className="text-xs mb-2 text-gray-800">Terkumpul : {resProductInvestDetail?.progress_percent}%</p>
                  <p className="text-xs mb-2 text-gray-800">{resProductInvestDetail?.trx_count} Hari Lagi</p>
                </div>
                <Progress persen={resProductInvestDetail?.progress_percent}></Progress>
              </div>              
            </div>
            <div className="w-full xl:w-2/4 lg:w-3/5">
              <div className="hidden lg:block xl:hidden">
                <div className="">
                  <Image alt={"Image"} className="w-full rounded-lg object-cover" src={resProductInvestDetail?.image} ></Image>
                </div>
                <div className="mt-10 mb-2">
                  <div className="flex justify-between">
                    <p className="text-xs mb-2 text-gray-800">Terkumpul : {resProductInvestDetail?.progress_percent}%</p>
                    <p className="text-xs mb-2 text-gray-800">{resProductInvestDetail?.trx_count} Hari Lagi</p>
                  </div>
                  <Progress persen={resProductInvestDetail?.progress_percent}></Progress>
                </div>
              </div>
              <div className="xl:px-10">                
                <div className="text-lg mb-1">
                  <span>{`Investment - ${resProductInvestDetail?.title}`}</span>
                </div>
                <div className="max-w-max mt-1 mb-2">            
                  <div className="py-1 px-2 text-xs rounded text-white font-medium bg-green-500 ">
                    <p>{resProductInvestDetail?.product_type}</p>
                  </div>
                </div>
                <div className="text-sm font-light text-blue-500 mb-5">
                  <span>{`Lot Tersedia (${resProductInvestDetail?.lot_available})`}</span>
                </div>
                <div className="text-4xl font-bold mb-5">
                  <span>{`${convertToRp(resProductInvestDetail?.price)}/Lot`}</span>
                </div>
                
                {renderUnduhProkpektus}

                <div className="text-xl text-gray-800 font-bold">
                  <span>Description</span>
                </div>
                <div className="text-sm text-gray-700 text-justify mt-2">
                  <span dangerouslySetInnerHTML={{__html:resProductInvestDetail?.description}}></span>
                </div>                                  
                <div className="my-5" >
                  <iframe className="w-full h-80"  src={resProductInvestDetail?.gmaps_embed_url}></iframe>
                </div>     
                <div className="my-5">
                  <a href={resProductInvestDetail?.gmaps_url} target="_blank" rel="noopener noreferrer">
                    <button className="bg-green-500 bg-opacity-20 hover:bg-green-500 hover:text-white text-green-500 font-bold text-sm w-full py-2 px-4 rounded">
                      Lihat Lokasi
                    </button>
                  </a>                       
                </div>

                
                {/* <div className="ring-1 ring-gray-200 mt-10 w-full"></div>

                  <div className="w-full text-green-500 pt-2 flex flex-nowrap space-x-10 overflow-x-auto">
                    <button onClick={()=>setNavigationButton(1)} className={`px-2 py-1 ${(navigationButton===1)?"border-b-2 border-green-500 font-semibold":""}`}>Detail</button>
                    <button onClick={()=>setNavigationButton(2)} className={`px-2 py-1 ${(navigationButton===2)?"border-b-2 border-green-500 font-semibold":""}`}>Fitur</button>
                    <button onClick={()=>setNavigationButton(3)} className={`px-2 py-1 ${(navigationButton===3)?"border-b-2 border-green-500 font-semibold":""}`}>Legalitas</button>
                    <button onClick={()=>setNavigationButton(4)} className={`px-2 py-1 ${(navigationButton===4)?"border-b-2 border-green-500 font-semibold":""}`}>Appraisal</button>
                  </div>

                <div className="ring-1 ring-gray-200 mt-2 w-full"></div>
                
                {renderTab} */} 

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
                  <span>Saldo</span>
                </div>
                <div className="text-base font-bold mb-1">
                  <span>{`${convertToRp(getUserWadiah())}`}</span>
                </div>

                <div className="text-sm text-gray-500 text-justify mt-5" >
                  <span>Sisa Slot</span>
                </div>
                <div className="text-base font-bold mb-1">
                  <span>{`${calculateStok} item`}</span>
                </div>                                 

                <div className="text-sm text-gray-500 text-justify mt-5" >
                  <span>Total Tagihan</span>
                </div>
                <div className="text-xl font-bold mb-1">
                  <span>{`${convertToRp(calcuTotal)}`}</span>
                </div>                 

                <div className="text-sm text-gray-500 text-justify mt-5" >
                  <span>Sisa Saldo</span>
                </div>
                <div className="text-xl font-bold mb-1">
                  <span>{`${convertToRp(getUserWadiah()-calcuTotal)}`}</span>
                </div>                 

                {(resProductInvestDetail?.status === "CLOSED")?
                 <Image alt={"Image"} className="w-full rounded-lg object-cover" src={'/close.jpg'} ></Image>
                :(resProductInvestDetail?.status === "COMPLETED")?
                <Image alt={"Image"} className="w-full rounded-lg object-cover" src={'/close.png'} ></Image>:(
                  <>
                  <div className="my-5">
                    <div className="mb-2">
                      <span>Stok Pembelian</span>
                    </div>
                    <input value={qty} onChange={(e)=>handlerChangeQTY(e.target.value)} className="w-full p-2 rounded hover:border-yellow-300 ring-1 ring-gray-400" type="number"></input>
                  </div>
                  
                  <button onClick={handlerBeliSekarang} className="mt-2 w-full bg-green-600 hover:bg-green-500 rounded text-white font-semibold p-3">
                    {(isClick)?"Loading..":"Beli Sekarang"}
                  </button>                                    
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}