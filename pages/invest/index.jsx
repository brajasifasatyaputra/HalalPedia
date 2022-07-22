import React,{useEffect, useState} from 'react'

import {useRouter} from 'next/router'
import loadable from '@loadable/component'
import {FiSearch} from 'react-icons/fi'
import {useProductsWeb} from '../../api/get'
import { listTipeInvestment } from '../../helper/converter'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))
const Loading = loadable(()=>import("../../components/Loading-Component"))
const NotFound = loadable(()=>import("../../components/NotFound-Component"))
const Image = loadable(()=>import("next/image"))
const Select = loadable(()=>import("react-select"))

export default function Invest(){
  
  const {push} = useRouter()

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  const [searchFinal, setSearchFinal] = useState("");
  const [tipe, setTipe] = useState({value:"ALL", label:"ALL"});

  const {loadingProduct, notFoundProductInvest, dataProduct} = useProductsWeb(limit, offset, page, searchFinal, tipe?.value)

  
  const handlerSearchWithEnterButton = (e) => {
    if(e?.keyCode === 13){
      setSearchFinal(search)  
    }
  }
  
  const handlerSearch = () => {    
    setSearchFinal(search)
  }
  
  useEffect(()=>{
    if(search?.length === 0){
      handlerSearch()
    }
  },[search])

  const handlerClickDetail = (id) => {
    push("/invest/[id]", "/invest/"+id)
  }

  if(loadingProduct){
    return(
      <Wrapper title={"Invest - SCProperty"} description={"Page ini akan menampilkan semua barang yang tersedia pada toko Kotakjualan.com"}>
        <Loading></Loading>
      </Wrapper>
    )
  }

  else if(notFoundProductInvest){
    return(
      <Wrapper title={"Invest - SCProperty"} description={"Page ini akan menampilkan semua barang yang tersedia pada toko Kotakjualan.com"}>
        <NotFound></NotFound>
      </Wrapper>
    )
  }

  else{
    return(
      <Wrapper title={"Invest - SCProperty"} description={"Page ini akan menampilkan semua barang yang tersedia pada toko Kotakjualan.com"}>      
      <div className="min-h-full xl:min-h-screen bg-white md:px-14 px-5">
        <div className="flex justify-center md:mt-10 mt-4">
          <div className="w-full md:w-1/2 shadow-xl rounded-full flex bg-white-400 px-4 py-2 ring-1 ring-gray-400">
            <Select className="w-24 md:w-1/4" defaultValue={tipe} onChange={(e)=>setTipe(e)} options={listTipeInvestment()}></Select>
            <input value={search} onKeyUp={handlerSearchWithEnterButton} onChange={(e)=>setSearch(e?.target?.value)} type="text" placeholder="Mau cari apa hari ini?" className="w-1/2 flex-auto md:flex-1 px-2 outline-none ring-0 py-1 text-sm text-gray-800" />
            <button onClick={handlerSearch} className=" justify-items-end">
              <FiSearch size={25} className="text-gray-800" ></FiSearch>
            </button>
          </div>
        </div>
        <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mt-14 pb-10">                              
        {dataProduct?.map((e, i)=>(
            <React.Fragment key={i}>
              <div className=" shadow-2xl cursor-pointer" onClick={()=>handlerClickDetail(e?.product_master_id)}>
                <Image className="rounded-t" width={400} height={270} threshold={300} src={e?.image} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>
                <div className=" px-3 pb-4">
                  <p className="pt-5 font-semibold">{e?.title}</p>
                  {/* <div className="max-w-max mt-2">            
                    <div className="py-1 px-2 text-xs rounded text-white font-medium bg-green-500 ">
                      <p>{e?.category} - {e?.subcategory}</p>
                    </div>
                  </div> */}
                  <div className="flex justify-between mt-5">
                    <span>Max Token</span>
                    <span>{e?.token_max}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Bagi Hasil</span>
                    <span>{e?.bagi_hasil}</span>
                  </div>
                </div>            
              </div>                     
            </React.Fragment>                                
          ))}           
        </div>
      </div>
      </Wrapper>
    )
  }

}