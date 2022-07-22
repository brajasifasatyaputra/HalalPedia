import React, { useState, useMemo, useCallback } from 'react';
import loadable from '@loadable/component'
import {listFilterInboxTransaction} from '../../helper/data'
import { useTransactionList } from '../../api/get';
import { convertToRp } from '../../helper/converter';
 
const Select = loadable(()=>import('react-select'))
const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))
const Loading = loadable(()=>import("../../components/Loading-Component"))
const NotFound = loadable(()=>import("../../components/NotFound-Component"))
const Detail = loadable(()=>import("../../components/Inbox/Detail-Component"))

export default function InboxPage(){    

  const [show, setShow] = useState('');
  const [status, setStatus] = useState({label : "Transaksi Belum Selesai",value: "PENDING"});
  const {resTransactionList, loading, notFound} = useTransactionList(status.value)
  
  const handlerToogleButton = (id) => {
    if (show !== "") setShow("");
    else setShow(id);
  }
const convert = (a) => {
  let b = a.split('_');
  if(b[0]==='VA'){
    return  'Virtual Account '+b[1]
  }else{
    return a
  }

}
  const showDetailRender = useCallback((data)=>{    
    if(show === data?.user_transaction_id){
      return(
        <Detail data={data} status={status?.value}></Detail>  
      )
    }
    else return null
  },[show])

  const transactionMerchantListRender = useMemo(()=>{
    if(notFound){
      return(
        <NotFound></NotFound>
      )
    }
    else{
      return(
        <div className="flex-1 my-4 md:px-14 px-5">
          {
            resTransactionList?.map((data, index) => (
                
              <div className="mb-5" key={index}>
                <div onClick={()=>handlerToogleButton(data?.user_transaction_id)} className="w-full cursor-pointer border p-4 rounded-t">
                  <div className="flex justify-between">
                    <div className="flex-1 flex flex-col">
                      <span className="text-gray-700 text-xs">Total Pembayaran</span>                   
                      <span className="text-gray-700 text-lg font-semibold mb-3">{convertToRp(data?.payment?.amount)}</span>
                      {data?.payment?.detail?.name==='WADIAH'? null:
                        (data?.status === "DONE")?(
                          <>
                            <span className="text-gray-800 text-xs">Tipe Pembayaran</span>
                            <span className="text-gray-800 text-base mb-2">{`${ convert(data?.payment?.type)}`}</span>
                          </>
                        ):
                        <>
                          <span className="text-gray-800 text-xs">Tipe Pembayaran</span>
                          <span className="text-gray-800 text-base mb-2">{ convert(data?.payment?.type)}</span>
                          <span className="text-gray-800 text-xs">Nomor Rekening</span>
                          <span className="text-gray-800 text-base mb-2 font-semibold">
                            {data?.payment?.detail?.account}
                            <span className="text-gray-600 text-sm font-thin"> - ({data?.payment?.detail?.name})</span>
                          </span>                        
                        </>
                      }
                      <span className="text-gray-700 text-xs">Status Pesanan</span>                   
                      <span className="font-thin text-blue-500">{data?.status}</span>                                                          
                    </div>
                    <div>
                      <span className="text-blue-500 text-sm">{'Transaksi No - '+data?.user_transaction_id}</span>
                    </div>
                  </div>
                </div>
                {showDetailRender(data)}                  
              </div>
            ))
          }
        </div>
      )
    }
  },[resTransactionList, notFound, handlerToogleButton])  
  
  if(loading){
    return(
      <Wrapper title="Inbox List - Halalpedia Express" description="Page ini akan menampilkan list order yang kamu pesan beserta statusnya">
        <Loading></Loading>
      </Wrapper>
    )
  }  

  else{
    return(
      <Wrapper title="Inbox List - HaHalalpedia Expresslalpay" description="Page ini akan menampilkan list order yang kamu pesan beserta statusnya">
        
        <div className="flex flex-col">
          
          <div className="w-full md:px-14 px-5 mt-5">
            <p className="text-gray-800 font-semibold text-2xl">Page List Status Transaksi</p>
            <p className="text-gray-600 text-sm">Page ini akan menampilkan List Status Transaksi</p>
          </div>

          <div className='md:px-14 px-5 md:mt-10 mt-5'>
            <p className="text-sm text-gray-800 mb-1">Filter Status Transaksi</p>
            <Select
              value={status}
              placeholder=""
              onChange={(value)=>setStatus(value)}
              options={listFilterInboxTransaction()}                      
            />
          </div>

          {transactionMerchantListRender}
          
        </div>
      </Wrapper>
    )
  }  
}