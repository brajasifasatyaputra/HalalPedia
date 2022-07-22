import React from 'react';
import loadable from '@loadable/component'

import { useDetailPawnStore } from '../store/detail-pawn-store';
import { useStoreModal } from '../store/modal-store'
import { convertToRp } from '../helper/converter';
import { usePawnUserDetail } from '../api/get'
import { BASE_URL } from '../helper/axios';
import { useRouter } from 'next/router';

const Header = loadable(()=>import('../components/Head-Component'))

export default function DetailGadai(){

  const router = useRouter()

  const {idDetailPawnStore} = useDetailPawnStore();  
  const {closeModal} = useStoreModal();
  
  const handlerDownloadAkad = (id) => {
    if(typeof window === 'undefined') return;
    window.open(`${BASE_URL}/pawn/akad/download/${id}`);
  }

  const handlerClickMutasi = (id) => {
    router.push(`/gadai/${id}`);
    closeModal();
  }

  const {loading, resPawnUserDetail} = usePawnUserDetail(idDetailPawnStore);

  if(loading){
    return(
      <React.Fragment>
        <span>Loading..</span>
      </React.Fragment>
    )
  }
  else{
    return(
      <React.Fragment>
        <Header title="Detail User Pawn" description="SC Property Indonesia"></Header>
        <div className="flex flex-col overflow-auto">
          <div className="flex justify-center min-w-full">
            <div className="w-full bg-white my-12 md:rounded-md md:shadow-lg md:w-1/2">
              
              <div className="flex justify-between items-center px-7 mb-10 mt-5">
                <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Detail Gadai User</span>
              </div>  

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">GSI-{resPawnUserDetail?.user_pawn_id}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Nomor</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{(resPawnUserDetail?.approved_date == null)?"-":resPawnUserDetail?.approved_date}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Tanggal Diterima</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{resPawnUserDetail?.end_date}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Tanggal Jatuh Tempo</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{resPawnUserDetail?.weight} Gram</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Rincian Barang Jaminan (gram)</span>
              </div>
          
              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{resPawnUserDetail?.day_count} Hari</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Lama Gadai</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{convertToRp(resPawnUserDetail?.amount_cost_daily)}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Biaya Sewa Penyimpanan (A)</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{convertToRp(resPawnUserDetail?.amount_cost_administration)}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Biaya Administrasi (B)</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{convertToRp(resPawnUserDetail?.amount_financing)}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Pembiayaan (C)</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{convertToRp(resPawnUserDetail?.amount_payable)}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Total Pembiayaan & Biaya (A+B+C)</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{convertToRp(resPawnUserDetail?.amount_financing)}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Uang Yang Diperoleh dari Gadai</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{convertToRp(resPawnUserDetail?.amount_payable)}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Besarnya Pelunasan Nasabah</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{resPawnUserDetail?.type_asset}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Tipe Jaminan</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{resPawnUserDetail?.status}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Status</span>
              </div>

              <div className="my-5 px-7 flex flex-col">
                <span className="font-semibold text-md text-gray-500 ">{resPawnUserDetail?.description}</span>                
                <span className="text-sm text-gray-400 mt-1 italic">Deskripsi</span>
              </div>

              {(resPawnUserDetail?.status === "APPROVED")?(
                <div className="mt-7 mb-3 px-7 flex flex-col">
                  <button onClick={()=>handlerClickMutasi(resPawnUserDetail?.user_pawn_id)}  className="bg-yellow-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-yellow-400">
                    List Mutasi Gadai
                  </button>          
                </div>
              ):null}
            
              <div className="mb-7 px-7 flex flex-col">
                <button onClick={()=>handlerDownloadAkad(resPawnUserDetail?.user_pawn_id)}  className="bg-yellow-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-yellow-400">
                  Download Akad
                </button>
              </div>

            </div>            
          </div>
        </div>
      </React.Fragment>
    )
  }

}