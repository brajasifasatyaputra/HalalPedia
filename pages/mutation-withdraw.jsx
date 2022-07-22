import React, { useState } from 'react';

import loadable from '@loadable/component'
import { convertToRp,  listStatusWithdrawWadiah } from '../helper/converter';
import { WadiahStatus } from '../api/get';
   
const Select = loadable(()=>import('react-select'))
const Loading = loadable(()=>import("../components/Loading-Component"))
const Wrapper = loadable(()=>import("../components/WrapperProfile"))

export default function MutasiWithdraw() {
  
  const [previeouseData, setPrevieouseData] = useState([]);   
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState({ value: 'REQUESTED', label: 'Menunggu persetujuan' });

  const { resMutation, loading,lengDataComeMutation} = WadiahStatus(status.value,page);
 
  const handlerLoadMore = () => {
    setPrevieouseData(resMutation)
    setPage(page+1)
  }
    

  if (loading) {
    return (
      <Wrapper index={9} title="List Status Wadiah - Dana Sesama" description="Page for show list status withdraw wadiah SC Properti">
        <Loading></Loading>
      </Wrapper>
    )
  }

  else {
    return (
      <Wrapper index={9} title="List Status Wadiah - DanaSesama" description="Page for show list status withdraw wadiah SC Properti">
        <div className="bg-white pb-20">
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="">                
                <h3 className="text-3xl text-gray-800 font-semibold">Mutation List</h3>                
                <p className="text-sm text-gray-800">
                  Page ini akan menampilkan aktivitas penarikan saldo mu
                </p>                                                                                         
              </div>
            </div>
            <div className="flex-1 mb-10">
              <Select
                value={status}
                placeholder="Pilih Interval"
                onChange={(value) => setStatus(value)}
                options={listStatusWithdrawWadiah()}
              />
            </div>            
            <div className="inline-block overflow-x-auto bg-white">
              {(resMutation?.length === 0)?(
                <div className="w-full flex justify-center text-center text-4xl mt-5">Belum ada aktifitas yang berkaitan dengan saldo kamu</div>
              ):(
                <>
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-t-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">No</th>
                      <th className="px-6 py-3 border-b-2 border-t-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Nominal</th>
                      <th className="px-6 py-3 border-b-2 border-t-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">No. Rek</th>
                      <th className="px-6 py-3 border-b-2 border-t-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
                      <th className="px-6 py-3 border-b-2 border-t-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Bank</th>
                      
                    </tr>
                  
                  </thead>
                  <tbody className="bg-white">
                    {
                      resMutation?.map((data, index) => (

                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{index+1}</div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"> {convertToRp(data.amount)}</td>
                          
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"> {data.number}</td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"> {data.name}</td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"> {data.bank}</td>

                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                {(resMutation?.length < 5 || lengDataComeMutation === 0 || lengDataComeMutation < 5)?null:(
                  <div className="flex justify-center mt-10 mb-10">
                    <button onClick={handlerLoadMore} className="bg-white w-full text-blue-500 border-blue-400 border-2  font-semibold py-2 px-4 rounded">Load more</button>
                  </div>
                )}
                </>
              )}
              
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
