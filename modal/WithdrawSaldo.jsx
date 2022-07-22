import React,{useMemo, useState} from 'react'
import loadable from '@loadable/component'
import { useBankSelectTarikSaldo } from "../api/get";
import { postWadiahHandler } from '../api/post'
import { getUserWadiah } from '../helper/localStorage';
import { convertToRp } from '../helper/converter';
import { alertError, alertSuccess, alertWarning } from '../helper/sweetalert';
import { useStoreModal } from '../store/modal-store';

const Header =  loadable(()=>import("../components/Head-Component"))
const Select = loadable(()=>import("react-select"))

export default function WithdrawSaldo(){

  const {resBankSelect} = useBankSelectTarikSaldo()  

  const {closeModal} = useStoreModal()

  const [isClick, setIsClick] = useState(false);
  const [tarikSaldo, setTarikSaldo] = useState(0);
  const [bank, setBank] = useState("");

  const listBank = useMemo(()=>{    

    if(resBankSelect == null){
      return ""
    }

    return resBankSelect

  },[resBankSelect])

  const handlerClick = async () => {

    if(isClick) return

    setIsClick(true)

    const dataBank = bank?.value?.split("-")    

    if(parseInt(getUserWadiah()) < parseInt(tarikSaldo)){
      await alertWarning("Oppps", "Jumlah saldo tidak cukup")
      setIsClick(false)
      return
    }

    else if(parseInt(tarikSaldo) < 10000){
      await alertWarning("Oppps", "Jumlah Saldo yang ditarik minimal Rp. 10.000")
      setIsClick(false)
      return
    }

    else if(bank === ""){
      await alertWarning("Oppps", "Mohon pilih bank yang ingin dituju terlebih dahulu yaa")
      setIsClick(false)
      return
    }

    const res = await postWadiahHandler(dataBank[0], dataBank[1], tarikSaldo, dataBank[2])

    if(!res?.status){
      await alertError("Terjadi Kesalahan", res?.data?.message)
      setIsClick(false)
      return
    }

    await alertSuccess("Berhasil", "Berhasil menarik saldo sebesar "+convertToRp(tarikSaldo))
    setIsClick(false)
    closeModal()
    return

  }

  return (
    <React.Fragment>
      <Header title="Change Password" description="Gadai Syariah Indonesia"></Header>
      <div className="flex flex-col overflow-auto">
        <div className="flex justify-center min-w-full">
          {/* //box class  */}
          <div className="w-full bg-white mb-12 mt-1 md:rounded-md md:shadow-lg md:w-96">
            <div className="flex justify-between items-center px-7 mb-10 mt-5">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Tarik Saldo</span>
            </div>            
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Total Saldo</span>
              <input type="text" readOnly value={convertToRp(getUserWadiah())}  className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-800 hover:border-gray-800"></input>              
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Total Withdraw Saldo</span>
              <input type="number" value={tarikSaldo} onChange={(e)=>setTarikSaldo(e?.target?.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-800 hover:border-gray-800"></input>              
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Pilih Bank</span>
              <Select options={listBank} value={bank} onChange={(e)=>setBank(e)}></Select>
            </div>
            <div className="my-7 px-7 flex flex-col">
              <button onClick={handlerClick} className="bg-green-400 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-500">
                {(isClick) ? "Loading.." : "Tarik Saldo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}