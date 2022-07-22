import React, { useState }  from 'react';
import loadable from '@loadable/component'
import {useBank,useBankMasterSelect} from '../api/get';
import {addBankUser} from '../api/post';
import {deleteBankUser} from '../api/delete';
import { mutate } from 'swr'
import { alertSuccess, alertError, alertQuestion, alertWarning} from '../helper/sweetalert'

const Select = loadable(()=>import('react-select'))
const Wrapper = loadable(()=>import("../components/WrapperProfile"))
const Loading = loadable(()=>import("../components/Loading-Component"))

export default function Bank() {  
  
  const {resBank,loadingBank} = useBank(); 
  const {resBankMasterSelect,loading} = useBankMasterSelect();  
  
  const [bankMaster, setBankMaster] = useState('');

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const [isClick, setIsClick] = useState(false);
  
  const addBank = async () =>{  
    if(isClick) return
    setIsClick(true)   
    if(name.length === 0){
      await alertWarning("Opppss!!", "Mohon lengkapi form Nama Pemilik Rekening terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }
    if(number.length === 0){
      await alertWarning("Opppss!!", "Mohon lengkapi form Nomor Rekening terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }
    if(bankMaster?.value?.length === 0 || bankMaster?.label?.length === 0){
      await alertWarning("Opppss!!", "Mohon lengkapi Rekening Bank form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }    
    const res = await alertQuestion("Confirmation!!", "Apakah kamu yakin ingin menambahkan data bank ini?", "Yes, Add Bank!");    
    if(!res){
      setIsClick(false);
      return;
    }    
    if(await addBankUser(name,number,bankMaster?.value,bankMaster?.label)){
      await alertSuccess("Data Bank Berhasil Ditambah", "Bank transfer anda sudah ditambah");      
      mutate("/user/bank");
    }else{
      await alertError("Data Bank Gagal Di tambahkan", "Silahkan tambah bank kembali atau kontak CS kami");
    }
    setName("");
    setNumber("");
    setBankMaster("");
    setIsClick(false);
  }

  const deleteBank = async (id) =>{
    if(await alertQuestion("Confirmation", "Apakah Anda Yakin Ingin Menghapus Rekening ini?")){
      if(await deleteBankUser(id)){
        await alertSuccess("Success Delete!", "List Bank yang kamu pilih telah di hapus :)");        
        mutate("/user/bank");
      }else{
        await alertError("Oppss Something Wrong!", "Silahkan tambah bank kembali atau kontak CS kami");
      }
    }
  }

  if(loading || loadingBank){
    return(
      <Wrapper index={6} title="Bank - SC Property" description="Page for show compact infomation about bank in SC Property">
        <Loading></Loading>
      </Wrapper>
    );
  }
  else if(resBank?.length === 0 || resBank == null){
    return(
      <Wrapper index={6} title="Bank - SC Property" description="Page for show compact infomation about bank in SC Property">
        <div className="flex justify-center">
          <span className="text-xl font-light">Data Tidak Ditemukan</span>
        </div>         
      </Wrapper>
    )
  }
  else{

    return (    
      <Wrapper index={6} title="Bank - SC Property" description="Page for show compact infomation about bank in SC Property">
            
        <p className="text-3xl font-semibold">Setting Bank User</p>                
        <p className="mt-1 text-sm text-gray-800">Page ini akan menampilkan dan memberikan akses ke dalam data bank user.</p>                                                                                         
          
        <div className="mt-5">                        
          <div className="py-5 bg-white space-y-6">
            
            <div className="grid grid-cols-3 gap-6">                                
              <div className="col-span-12">
                <label className="text-sm text-gray-800 mb-1">
                  Nomor Rekening
                </label>
                <input value={number} onChange={(v)=>{setNumber(v.target.value) }} type="number"  placeholder="Nomor Rekening Anda" className="w-full px-2 py-2 border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"/>
              </div>
              <div className="col-span-12">
                <label className="text-sm text-gray-800 mb-1">
                  Nama Pemilik Rekening
                </label>
                <input value={name} onChange={(v)=>{setName(v.target.value) }} type="text" placeholder="Nomor Rekening Atas Nama" className="w-full px-2 py-2 border rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"/>
              </div>
            </div>

            <div className="col-span-12">
              <label className="text-sm text-gray-800 mb-1">
                Pilih Bank
              </label>

              <Select
                value={bankMaster}
                placeholder="Pilih Rekening Bank"
                onChange={(value)=>setBankMaster(value)}
                options={resBankMasterSelect}                
              />
                  
            </div>
              
          </div>

            <div className="py-3 flex justify-start">
              <button onClick={()=>addBank()} className="py-2 px-4 text-sm font-medium rounded text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                {(isClick)?"Loading..":"Tambah Data"}
              </button>
            </div>                

        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-5">                
              {resBank?.map((data, index) => (
                <React.Fragment key={index}>
                  <div onClick={()=>deleteBank(data?.user_bank_id)} className=" w-full py-3 px-4 cursor-pointer bg-white border hover:border-green-500 rounded my-2">                        
                    <div>
                      <h2 className="text-gray-800 text-xl">{data?.bank_name}</h2>
                      <p className=" text-blue-500 text-sm mt-2">Nomor Rekening</p>
                      <p className="text-gray-800"> {data?.number}</p>
                      <p className=" text-blue-500 text-sm">Atas Nama</p>
                      <p className="text-gray-800"> {data?.name}</p>                      
                    </div>                      
                  </div>
                </React.Fragment>
              ))}
            </div>            
  
      </Wrapper>          
    )
  }
}
