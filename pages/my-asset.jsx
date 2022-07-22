import loadable from '@loadable/component'
import { useState, useMemo } from 'react'
import { useUserAssetList } from '../api/get'
import { convertToRp, listFilterMyAsset } from '../helper/converter'

const Wrapper = loadable(()=>import("../components/WrapperProfile"))
const Select = loadable(()=>import("react-select"))
const Loading = loadable(()=>import('../components/Loading-Component'))

export default function MyAsset(){
  
  const [fitler, setFitler] = useState({label:"ONGOING",value:"CLOSED"});
  const [search, setSearch] = useState("");

  const [tmpSearch, setTmpSearch] = useState("");

  const filterMyAsset = useMemo(()=>{
    if(fitler?.value == null){
      return "CLOSED"
    }
    return fitler?.value
  },[fitler])  

  const changeSearch = (e) => {
    if(e?.length === 0){
      setSearch("")      
    }
    setTmpSearch(e)
  }

  const handlerSearch = (e) => {
    if(e?.keyCode === 13){
      setSearch(tmpSearch)
    }
  }

  const {resAsset, loadingAsset} = useUserAssetList(search, filterMyAsset)

  const total = useMemo(()=>{
    let ttl = [0,0,0,0]
    console.log(resAsset)
    if(resAsset?.data?.length === 0 || resAsset == null) return ttl
    resAsset?.forEach((e)=>{
      ttl[0] = ttl[0] + e?.amount_idr      
      ttl[1] = ttl[1] + parseInt(e?.bagi_hasil)
      ttl[3] = ttl[3] + parseInt(e?.amount_lot)
    })
    ttl[2] = resAsset?.length
    return ttl
  },[resAsset])

  if(loadingAsset){
    return(
      <Wrapper index={0} title={"My Asset - ScProperty"} description={"Page ini akan menampilkan asset yang saya miliki"}>
        <Loading></Loading>
      </Wrapper>
    )
  }
  else{
  return(
    <Wrapper index={0} title={"My Asset - ScProperty"} description={"Page ini akan menampilkan asset yang saya miliki"}>
      <>
        
        <p className="text-3xl font-semibold text-gray-800">Page Asset</p>
        <p className="text-gray-800 text-sm mt-1">Page ini akan menampilkan semua asset yang kamu miliki</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
          <div className="w-full rounded flex flex-col bg-green-500 text-white py-5">
            <p className="text-3xl text-white flex justify-center">{convertToRp(total[0])}</p>
            <p className="text-white mt-1 text-xs justify-center flex">Total Asset (Rp.)</p>
          </div>
          <div className="w-full rounded flex flex-col bg-white border border-gray-300 text-gray-800 py-5">
            <p className="text-3xl flex justify-center">{convertToRp(total[1])}</p>
            <p className=" mt-1 text-xs justify-center flex">Total Bagi Hasil / Bulan</p>
          </div>
          <div className="w-full rounded flex flex-col bg-white border border-gray-300 text-gray-800 py-5">
            <p className="text-3xl  flex justify-center">{total[2]}</p>
            <p className="mt-1 text-xs justify-center flex">Total Project</p>
          </div>          
          <div className="w-full rounded flex flex-col bg-white border border-gray-300 text-gray-800 py-5">
            <p className="text-3xl  flex justify-center">{total[3]}</p>
            <p className="mt-1 text-xs justify-center flex">Total Lot</p>
          </div>          
        </div>

        <div className="w-full flex flex-wrap mt-5">
          <div className="w-full md:w-1/3">
            <div className="md:mr-4 mb-2 md:mb-0">
              <Select className="w-full" options={listFilterMyAsset()} value={fitler} onChange={(e)=>setFitler(e)}></Select>
            </div>
          </div>
          <div className="w-full md:flex-1">
            <input type="text" value={tmpSearch} onKeyUp={handlerSearch} onChange={(e)=>changeSearch(e?.target?.value)} className="text-sm border border-gray-300 w-full  py-2 px-2 rounded " placeholder="Cari Asset Kamu!" />
          </div>
        </div>

        <div className='md:flex-row md:w-full mt-5'>
          <div className="md:hidden block">  
            <table className="table-auto w-full">
              <tbody>      
                {(resAsset?.data?.length === 0)?null:(
                  resAsset?.data?.map((e,i)=>(
                    <div className='border rounded-lg mt-5' key={i}>                
                      <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">No</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">{i+1}</td>
                      </tr>              
                      <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">Nama Produk</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">{e?.product_title}</td>
                      </tr>
                      <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">Besar Lot</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">{e?.amount_lot} Lot</td>
                      </tr>

                      <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">Nilai Asset (Rp.)</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">{convertToRp(e?.amount_idr)}</td>
                      </tr>                  
                      <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">Besar Dividen</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">{e?.dividen}</td>
                      </tr>
                    
                      <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">Bagi Hasil (Rp.)</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">{convertToRp(e?.bagi_hasil)}</td>
                      </tr>
                      <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">Tanggal Mulai</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">{e?.project_date}</td>
                      </tr>
                      <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">Tanggal Selesai</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">{e?.project_end_date}</td>
                      </tr>
                    
                      {/* <tr>
                        <td className=" w-1/3 border-b-2 border-gray-100   py-5 pl-5">Action</td>
                        <td className="w-2/3 border-b-2 border-gray-100   py-5 pl-5">                            
                          <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded py-2 px-4">Detail</button>              
                        </td>
                      </tr> */}

                    </div>                  
                  ))
                )}
              </tbody>
            </table>
          </div>
    
          <div className='md:block hidden'>
            <table className="table-auto w-full ">
              <thead>   
                <tr className="text-left">
                  <th className="border-b-2 border-t-2 border-gray-200 py-5">No</th>                
                  <th className="border-b-2 border-t-2 border-gray-200 py-5">Nama Produk</th>                
                  <th className="border-b-2 border-t-2 border-gray-200 py-5">Besar Lot</th> 
                                
                  <th className="border-b-2 border-t-2 border-gray-200 py-5">Nilai Asset (Rp.)</th>   
                  <th className="border-b-2 border-t-2 border-gray-200 py-5">Besar Dividen</th>               
                  <th className="border-b-2 border-t-2 border-gray-200 py-5">Bagi Hasil (Rp.)</th>                
                  <th className="border-b-2 border-t-2 border-gray-200 py-5">Tanggal Mulai</th>
                  <th className="border-b-2 border-t-2 border-gray-200 py-5">Tanggal Selesai</th>
                  {/* <th className="border-b-2 border-t-2 border-gray-200 py-5">Action</th>         */}
                </tr>     
              </thead>
              <tbody>
                {(resAsset?.data?.length === 0)?null:(
                  resAsset?.data?.map((e,i)=>(
                    <tr className="text-left" key={i}>
                      <td className="py-4 px-2">{i+1}</td>
                      <td className="py-4 px-2">{e?.product_title}</td>
                      <td className="py-4 px-2">{e?.amount_lot} Lot</td>
                    
                      <td className="py-4 px-2">{convertToRp(e?.amount_idr)}</td>
                      <td className="py-4 px-2">{e?.dividen}</td>
                      <td className="py-4 px-2">{convertToRp(e?.bagi_hasil)}</td>
                      <td className="py-4 px-2">{e?.project_date}</td>          
                      <td className="py-4 px-2">{e?.project_end_date}</td>                                
                      {/* <td className="py-4">                
                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded py-2 px-4">Detail</button>
                      </td> */}
                    </tr>                    
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </Wrapper>
  )
  }
}