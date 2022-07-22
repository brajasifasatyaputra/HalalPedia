import React, { useState } from 'react';

import loadable from '@loadable/component'

import {useRouter} from 'next/router';
import { convertToRp, enumConverter,listInterval } from '../helper/converter';
import { useMutation,useMutationList } from '../api/get';
 
  
const Select = loadable(()=>import('react-select'))
const Loading = loadable(()=>import("../components/Loading-Component"))
const Wrapper = loadable(()=>import("../components/WrapperProfile"))
const NotFound = loadable(()=>import('../components/NotFound-Component'))

export default function MutasiSaldo() {

  const router = useRouter();

  const [previeouseData, setPrevieouseData] = useState([]);
   
  const [page, setPage] = useState(0); 
  const [interval, setInterval] = useState({ value: '1', label: '1 Hari' });
  const [type, setType] = useState({ value: 'WADIAH', label: 'IDR' });

  const { resMutation, loading,lengDataComeMutation} = useMutation(page,interval.value,previeouseData,type.value==='WADIAH'?type.value:'SREC',type.value==='WADIAH'?'':type.value);
  const {resMutationList, loadingList} = useMutationList();
  
  // const handlerLoadMore = () => {
  //   setPrevieouseData(resMutation)
  //   setPage(page+1)
  // }
    

  if (loading||loadingList) {
    return (
      <Wrapper  index={8} title="List Mutasi - SC Property" description="Page for show list activity your transaction SC Property">
        <Loading></Loading>
      </Wrapper>
    )
  }

  else {
    return (
      <Wrapper  index={8} title="List Mutasi - SC Property" description="Page for show list activity your transaction SC Property">        
        <div className="flex flex-col ">
          
          <p className='text-3xl font-semibold'>Page Riwayat</p>
          <p className="text-sm text-gray-800">Page ini akan menampilkan riwayat dari aktifitas saldo IDR dan Investasi mu.</p>                    

          <div className='w-full my-10'> 
            <div className="w-full">
              <Select
                value={type}
                placeholder="Pilih Interval"
                onChange={(value) => {setType(value);}}
                options={resMutationList}
              />
            </div>
            <div className="w-full mt-5 ">
              <Select
                value={interval}
                placeholder="Pilih Interval"
                onChange={(value) => setInterval(value)}
                options={listInterval()}
              />
            </div>
          </div>
          <div className='md:flex-row w-full mb-10'>
            
          <div className='block md:hidden'>
           
              <table className="table-auto w-full mt-10">
                <thead>   
                  <tr className="text-left">
                    <th style={{fontSize:11}} className="border-b-2 border-t-2 border-gray-200 py-5">No</th>                
                    <th style={{fontSize:11}} className="border-b-2 border-t-2 border-gray-200 py-5">Uraian</th> 
                    <th style={{fontSize:11}} className="border-b-2 border-t-2 border-gray-200 py-5">Tipe</th> 
                    <th style={{fontSize:11}} className="border-b-2 border-t-2 border-gray-200 py-5">Nominal</th>                
                    <th style={{fontSize:11}} className="border-b-2 border-t-2 border-gray-200 py-5">Saldo Akhir</th>                               
                                          
                  </tr>     
                </thead>
                <tbody>
                  {resMutation != null? 
                    resMutation?.map((item, index) => ( 
                      <tr className="text-left" key={index}>
                        <td style={{fontSize:10}} className=" py-4">{index+1}</td>
                        <td className="py-4">
                          <p style={{fontSize:10}} className='w-36'>{item?.description}</p>
                          <div className='justify-between flex flex-row'>
                            <p style={{fontSize:10}} className='  text-green-500'>{item?.created_at.split(' ')[0]}</p>
                            <p style={{fontSize:10}} className='text-gray-500  mr-10'>{item?.created_at.split(' ')[1]}</p>
                          </div>
                        </td>
                        <td style={{fontSize:10}} className="py-4">{enumConverter(item?.mutation_type)}</td>  
                        <td style={{fontSize:10}} className="py-4">{type.value==='WADIAH'?convertToRp(item?.amount):item?.amount }</td>                  
                        <td style={{fontSize:10}} className="py-4">{type.value==='WADIAH'?convertToRp(item?.amount_after):item?.amount_after }</td>
                                             
                      </tr>            
                    ))
                  : <NotFound></NotFound>     
                  } 
                </tbody>
              </table>
            </div>    
            <div className='md:block hidden'>
             
              <table className="table-auto w-full mt-10">
                <thead>   
                  <tr className="text-left">
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">No</th>                
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">Uraian</th> 
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">Tipe</th> 
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">Nominal</th>                
                    <th className="border-b-2 border-t-2 border-gray-200 py-5">Saldo Akhir</th>                               
                                          
                  </tr>     
                </thead>
                <tbody>
                  {resMutation != null? 
                    resMutation?.map((item, index) => ( 
                      <tr className="text-left" key={index}>
                        <td className="py-4 mr-5">{index+1}</td>
                        <td className="py-4 ">
                          <p>{item?.description}</p>
                          <div className='justify-between flex flex-row'>
                            <p className='text-green-500 text-sm '>{item?.created_at.split(' ')[0]}</p>
                            <p className='text-gray-500 text-sm mr-32'>{item?.created_at.split(' ')[1]}</p>
                          </div>
                        </td>
                        <td className="py-4 mr-5">{enumConverter(item?.mutation_type)}</td>  
                        <td className="py-4 mr-5">{type.value==='WADIAH'?convertToRp(item?.amount):item?.amount }</td>                  
                        <td className="py-4 mr-5">{type.value==='WADIAH'?convertToRp(item?.amount_after):item?.amount_after }</td>
                                             
                      </tr>            
                    ))
                  : <NotFound></NotFound>     
                  } 
                </tbody>
              </table>
            </div>    
          </div>          
        </div>
      </Wrapper>
    )
  }
}
