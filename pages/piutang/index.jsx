import loadable from '@loadable/component'
import {BiSpreadsheet} from 'react-icons/bi'
import { usePiutangList } from '../../api/get'
import { useRouter } from 'next/router'
import { convertToRp } from '../../helper/converter'
import { setIDTagihan } from '../../helper/localStorage'

const Wrapper = loadable(()=>import('../../components/WrapperProfile'))
const Loading = loadable(()=>import("../../components/Loading-Component"))
 

export default function PiutangPage(){

  const router = useRouter()

  const {resPiutang, loadingPiutang, notFoundPiutang} = usePiutangList()  
  console.log({notFoundPiutang})
  const handlerDetailClick = (id) => {
    setIDTagihan(id)
    router.push({
      pathname: '/piutang/[id]',
      query: { id },
    })
  }

  if(loadingPiutang){
    return(
    <Wrapper title="Tagihan Page" description="Tagihan Page" index={2}>
      <Loading></Loading>
    </Wrapper>
    )
  }
  else if(notFoundPiutang){
    return(
      <Wrapper title="Tagihan Page" description="Tagihan Page" index={2}>
        <div className="flex flex-wrap justify-center">
          <p>Saat ini anda belum memiliki tagihan.</p>
        </div>
      </Wrapper>    
    )
  }
  else{
    return(
      <Wrapper title="Tagihan Page" description="Tagihan Page" index={2}>
        
        <p className="text-gray-800 font-semibold text-2xl">Pembayaran Tagihan </p>
        <p className="text-gray-600 text-sm">Page yang menampilkan list tagihan kamu</p>
  
        <div className="mt-5 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
          {resPiutang?.map((e,i) => (
            <div key={i}>
            <div className="border border-gray-200 shadow rounded p-4">
            <div className='flex flex-row'>
              <div className="bg-green-400 bg-opacity-25 p-1  rounded-full h-10 w-10">                
                <BiSpreadsheet className="text-green-400" size={32}></BiSpreadsheet>
                 
              </div>
              <div className='flex flex-col'>
              <p className='ml-2   text-sm w-full'>{e?.perumahan}  </p>
              <p className='ml-2   text-sm w-full'>{e?.unit}  </p>
              </div>
            </div>
              <div className="flex justify-between mt-5">
                <p className="text-gray-800 font-light text-xs">Saldo efektif</p>
                <p className="text-gray-800 text-xs font-light">{convertToRp(e?.saldo)}</p>
              </div> 
              <div className="flex justify-between mt-5">
                <p className="text-gray-800 font-light text-xs">Besar Cicilan</p>
                <p className="text-gray-800 text-xs font-light">{convertToRp(e?.cicilan)}</p>
              </div>              

              <div className="flex justify-between mt-5">
                <p className="text-gray-800 font-light text-xs">Harga Cash</p>
                <p className="text-gray-800 text-xs font-light">{convertToRp(e?.harga_cash)}</p>
              </div>              
          
              <div className="flex justify-between mt-2">
                <p className="text-gray-800 font-light text-xs">Angsuran ke</p>
                <p className="text-gray-800 text-xs font-light">{e?.periode} dari Tenor {e?.tenor}</p>
              </div>  
              <div className="mt-5">
                <button onClick={()=>handlerDetailClick(e?.cicilan_id)} className="w-full text-green-600 bg-green-400 bg-opacity-25 text-sm py-2 px-1 rounded">
                  DETAIL
                </button>
              </div>

            </div>
            </div>
          ))}
        </div>
  
      </Wrapper>
    )
  }
}