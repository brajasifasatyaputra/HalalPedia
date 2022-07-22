import React, {useState, useEffect} from 'react';

import loadable from '@loadable/component'

import {convertToRp, listChooseBankForRetail} from '../helper/converter'
import {alertError, alertSuccess, alertWarning} from '../helper/sweetalert'
import {useBill} from '../api/get';
import {FiSearch} from 'react-icons/fi';
import { useStorePIN } from '../store/pin-store';
import { useStoreModal, useTemplateTipeModal } from '../store/modal-store';
import { paymentHandlerForMyBill } from '../api/post';
import { useRouter } from 'next/router';

const Wrapper = loadable(()=>import("../components/WrapperProfile"))
const NotFound = loadable(()=>import('../components/NotFound-Component'))
const Select = loadable(()=>import('react-select'))

export default function BillPage() {

  const {push} = useRouter()
   
  const [search, setSearch] = useState("");  
  const [dataGet, setDataGet] = useState(null);  

  const [bank, setBank] = useState([]);

  const {pinStore, confirmPIN, clearPINStore} = useStorePIN()
  const {showModal, modal} = useStoreModal()
  const {changeTipeModal} = useTemplateTipeModal()

  const [isClick, setIsClick] = useState(false);
  
  const handlerPayment = async () => {

    setIsClick(true)
    
    const res = await paymentHandlerForMyBill(dataGet?.rspData?.tobay, search, pinStore, bank?.value)
    
    if(!res?.status){
      await alertError("Terjadi Kesalahan", res?.data?.message)
      setIsClick(false)
      clearPINStore()
      return
    }

    clearPINStore()
    setIsClick(false)
    await alertSuccess("Berhasil", "Kamu Berhasil melakukan pembayaran!")
    push("/inbox")
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

  const handlerAtClick = async () => {
    
    if(isClick) return

    setIsClick(true)

    if(bank?.value == null){
      alertWarning("OOppps", "mohon pilih metode pembayaran terlebih dahulu yaa")
      setIsClick(false)
      return
    }

    changeTipeModal("pin")
    showModal()    

  }

  const HandlerSearchClick = async () => {
    let data = await useBill(search)
    if(data){          
      setDataGet(data?.res)
    }else{
      await alertError("Something Wrong", "Terjadi kesalahan data tidak ditemukan!");      
      setSearch("");      
    } 
  }

  const handlerEnterButton = async (e) => {
    if(e?.keyCode === 13){
      await HandlerSearchClick()
    }
  }
   
    return (
      <Wrapper index={2} title="My bill - SC Property" description="Page for show list billing SC Property">        
        <div className="flex flex-col ">          
          
          <div className="">
            <p className='text-3xl font-semibold'>Page Bill</p>
            <p className="text-sm text-gray-800 mt-1">Page ini akan menampilkan bill inquiry yang kamu miliki.</p>          
          </div>          
          
          <div className="flex mt-5">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handlerEnterButton} type="text" placeholder="Cari Tagihan"  className="w-full p-3 pr-0 border-t border-l border-b border-gray-400 rounded rounded-r-none text-sm focus:outline-none text-gray-800 hover:border-green-400"/>
            <button onClick={()=>HandlerSearchClick()} className="bg-transparent hover:bg-green-500 text-green-600 font-semibold hover:text-white px-4 border-t border-r border-b border-green-400 hover:border-transparent rounded rounded-l-none"><FiSearch size={25}></FiSearch></button>
          </div>

          {dataGet == null?null:(
            <>
            <div className='md:flex-row w-full mb-10'>
            <div className="md:hidden block">  
    
              <table className="table-auto w-full">
                <tbody>
                {dataGet?.detail?.map((item, index) => ( 
                  <div className='border rounded-lg mt-5 w-full' key={index}>
    
                    <tr className="flex justify-between px-5">
                      <td className=" border-b-2 border-gray-100 py-5">NO</td>
                      <td className="border-b-2 border-gray-100 py-5 text-right">{index+1}</td>
                    </tr>
                        
                    <tr className="flex justify-between px-5">
                      <td className=" border-b-2 border-gray-100 py-5">ID</td>
                      <td className="border-b-2 border-gray-100 py-5 text-right">
                        {item?.billing_id}
                      </td>
                    </tr>
    
                    <tr className="flex justify-between px-5">
                      <td className=" border-b-2 border-gray-100 py-5">NAMA PERUMAHAN</td>
                      <td className="border-b-2 border-gray-100 py-5 text-right">{item?.penyedia_jasa}</td>
                    </tr>
    
                    <tr className="flex justify-between px-5">
                      <td className=" border-b-2 border-gray-100 py-5">BLOK</td>
                      <td className="border-b-2 border-gray-100 py-5 text-right">{item?.jenisProduk}</td>
                    </tr>
                    
                    <tr className="flex justify-between px-5">
                      <td className=" border-b-2 border-gray-100 py-5">JENIS PRODUK</td>
                      <td className="border-b-2 border-gray-100 py-5 text-right">{item?.produk}</td>
                    </tr>
                                                        
                                           
                  </div>
                ))}                           
                </tbody>
              </table>
            </div>
            
            <div className='md:block hidden'>
              <table className="table-auto w-full ">
                <thead>   
                  <tr className="text-left">
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">NO</th>                
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">ID</th> 
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">NAMA PERUMAHAN</th>                
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">BLOK</th>                               
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">JENIS PRODUK</th>                       
                  </tr>     
                </thead>
                <tbody>
                  {dataGet != null? 
                    dataGet?.detail?.map((item, index) => ( 
                      <tr className="text-left" key={index}>
                        <td className="py-4">{index+1}</td>
                        <td className="py-4">{item?.billing_id}</td>
                        <td className="py-4">{item?.penyedia_jasa}</td>                  
                        <td className="py-4">{item?.produk}</td>
                        <td className="py-4">{item?.jenisProduk}</td>                        
                      </tr>            
                    ))
                  : <NotFound></NotFound>     
                  } 
                </tbody>
              </table>
            </div>    
          </div>
          <div className="border w-full border-gray-100 mt-2 mb-10"></div>
          <div className="w-full px-2">
            <div className="">
              <div>
                <p className="text-gray-800 font-semibold text-xl">Form Tagihan</p>                
              </div>
              <p className="text-blue-400 text-sm">{search}</p>
            </div>
            <p className="text-green-400 font-semibold mt-5 text-sm">Nama Pelanggan</p>
            <p className="text-gray-800 text-lg">{dataGet?.rspData?.nama}</p>

            <p className="text-green-400 font-semibold mt-5 text-sm">Biaya Tagihan</p>
            <p className="text-gray-800 text-sm">{convertToRp(dataGet?.rspData?.tobay-dataGet?.rspData?.admin)}</p>

            <p className="text-green-400 font-semibold mt-5 text-sm">Biaya Admin</p>
            <p className="text-gray-800 text-sm">{convertToRp(dataGet?.rspData?.admin)}</p>

            <p className="text-green-400 font-semibold mt-5 text-sm">Total Tagihan</p>
            <p className="text-gray-800 text-2xl font-semibold">{convertToRp(dataGet?.rspData?.tobay)}</p>
            
            <p className="text-gray-800 text-sm mb-2 mt-10">Metode Pembayaran</p>
            <Select options={listChooseBankForRetail()} value={bank} onChange={(e)=>setBank(e)}></Select>

            <button onClick={handlerAtClick} className="mt-2 w-full py-2 px-1 rounded bg-green-400 hover:bg-green-500 cursor-pointer text-white font-semibold">
              {(isClick)?"Loading..":"Bayar Tagihan"}
            </button>
          </div>
          </>
          )}
                              
        </div>
      </Wrapper>
    )
  
}
