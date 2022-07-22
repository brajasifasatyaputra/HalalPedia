import loadable from '@loadable/component'
import { useEffect, useMemo, useState } from 'react';

import {FiEdit} from 'react-icons/fi'
import { useUserInformationDetail } from '../../api/get';
import { getEmailUserLogin, getUserLogin } from '../../helper/localStorage';

const Wrapper = loadable(()=>import("../../components/WrapperProfile"))
const Loading = loadable(()=>import("../../components/Loading-Component"))
const NotFound = loadable(()=>import("../../components/NotFound-Component"))

export default function Profile(){

  const {loadingUserInformationDetail, notFoundUserInformationDetail, resUserInformationDetail} = useUserInformationDetail()    

  const [name, setName] = useState(getUserLogin());
  const [email, setEmail] = useState(getEmailUserLogin());
  const [ktp, setKtp] = useState("");
  const [npwp, setNpwp] = useState("");
  const [phone, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");

  const [isPreview, setIsPreview] = useState(true);

  useEffect(()=>{
    if(resUserInformationDetail != null){
      setKtp(resUserInformationDetail?.ktp)
      setNpwp(resUserInformationDetail?.npwp)
      setAlamat(resUserInformationDetail?.address)
    }
  },[resUserInformationDetail])

  const renderButtonSave = useMemo(()=>{
    if(!isPreview){
      return (
        <div className="flex justify-start mt-5">
          <button onClick={()=>setIsPreview(true)} className="bg-blue-400 px-8 py-2 font-semibold text-white rounded hover:bg-blue-500">Save</button>
        </div>
      )
    }
    else{
      return null
    }
  },[isPreview])

  const renderButtonEdit = useMemo(()=>{
    if(isPreview){
      return (
        <div className="flex justify-end mt-5">
          <p onClick={()=>setIsPreview(false)} className="text-blue-400 cursor-pointer">Edit</p>
        </div>
      )
    }
    else{
      return null
    }
  },[isPreview])

  if(loadingUserInformationDetail){
    return(
      <Wrapper index={3} title={"Profile - Sc Property"} description={"Page ini akan menampilkan profile kamu"}>
        <Loading></Loading>
      </Wrapper>  
    )
  }
  else if(notFoundUserInformationDetail){
    return(
      <Wrapper index={3} title={"Profile - Sc Property"} description={"Page ini akan menampilkan profile kamu"}>
        <NotFound></NotFound>
      </Wrapper>  
    )
  }
  else{
  return(
    <Wrapper index={3} title={"Profile - Sc Property"} description={"Page ini akan menampilkan profile kamu"}>
      
      <p className="text-4xl font-semibold text-gray-800">Page Profile</p>
      <p className="text-gray-700 text-sm mt-1 mb-4">Page ini akan menampilkan seluruh data profile kamu, jika terjadi perubahan segera hubungi customer service kami</p>      

      {/* {renderButtonEdit} */}

      <p className={`${(isPreview)?"mt-1":"mt-5"} mb-1 text-sm text-gray-800`}>Nama</p>
      <div className="flex justify-between">
        <input readOnly={isPreview} value={name} onChange={(e)=>setName(e?.target?.value)} type="text" className="flex-1 text-sm rounded border border-gray-300 p-2"/>
        {/* <button className="bg-white rounded text-gray-500 hover:bg-blue-400 hover:text-white hover:border-transparent w-12 border border-gray-400 flex rounded-l-none justify-center align-middle">
          <FiEdit className="mt-2" size={18}></FiEdit>
        </button> */}
      </div>

      <p className="mt-5 mb-1 text-sm text-gray-800">Email</p>
      <div className="flex justify-between">
        <input readOnly={isPreview} value={email} onChange={(e)=>setEmail(e?.target?.value)} type="email" className="flex-1 text-sm rounded  border border-gray-300 p-2"/>
        {/* <button className="bg-white rounded text-gray-500 hover:bg-blue-400 hover:text-white hover:border-transparent w-12 border border-gray-400 flex rounded-l-none justify-center align-middle">
          <FiEdit className="mt-2" size={18}></FiEdit>
        </button> */}
      </div>

      <p className="mt-5 mb-1 text-sm text-gray-800">No KTP</p>
      <div className="flex justify-between">
        <input readOnly={isPreview} value={ktp} onChange={(e)=>setKtp(e?.target?.value)} type="number" className="flex-1 text-sm rounded  border border-gray-300 p-2"/>
        {/* <button className="bg-white rounded text-gray-500 hover:bg-blue-400 hover:text-white hover:border-transparent w-12 border border-gray-400 flex rounded-l-none justify-center align-middle">
          <FiEdit className="mt-2" size={18}></FiEdit>
        </button> */}
      </div>

      <p className="mt-5 mb-1 text-sm text-gray-800">No NPWP</p>
      <div className="flex justify-between">
        <input readOnly={isPreview} value={npwp} onChange={(e)=>setNpwp(e?.target?.value)} type="number" className="flex-1 text-sm rounded  border border-gray-300 p-2"/>
        {/* <button className="bg-white rounded text-gray-500 hover:bg-blue-400 hover:text-white hover:border-transparent w-12 border border-gray-400 flex rounded-l-none justify-center align-middle">
          <FiEdit className="mt-2" size={18}></FiEdit>
        </button> */}
      </div>

      {/* <p className="mt-5 mb-1 text-sm text-gray-800">No Contact</p>
      <div className="flex justify-between">
        <input readOnly={isPreview} value={phone} onChange={(e)=>setPhone(e?.target?.value)} type="number" className="flex-1 text-sm rounded border border-gray-300 p-2"/>
        <button className="bg-white rounded text-gray-500 hover:bg-blue-400 hover:text-white hover:border-transparent w-12 border border-gray-400 flex rounded-l-none justify-center align-middle">
          <FiEdit className="mt-2" size={18}></FiEdit>
        </button>
      </div> */}

      <p className="mt-5 mb-1 text-sm text-gray-800">Alamat</p>
      <div className="flex justify-between">
        <textarea readOnly={isPreview} value={alamat} onChange={(e)=>setAlamat(e?.target?.value)} className="flex-1 text-sm rounded  border border-gray-300 p-2"/>
        {/* <button className="bg-white rounded text-gray-500 hover:bg-blue-400 hover:text-white hover:border-transparent w-12 border border-gray-400 flex rounded-l-none justify-center align-middle">
          <FiEdit className="mt-2" size={18}></FiEdit>
        </button> */}
      </div>    

      {renderButtonSave}  

    </Wrapper>
  )
  }
}