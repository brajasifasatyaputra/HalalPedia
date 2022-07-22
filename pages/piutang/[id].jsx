import {getIDTagihan} from '../../helper/localStorage'
import loadable from '@loadable/component'
import {convertToRp} from '../../helper/converter'
import { piutanDetailgList} from '../../api/get';
const Wrapper = loadable(()=>import('../../components/WrapperProfile'))
const Loading = loadable(()=>import("../../components/Loading-Component"))
export default function PiutangDetailPage(){
  const {loadingPiutangDetail,resPiutangDetail} = piutanDetailgList(getIDTagihan())
  if(loadingPiutangDetail ){
    return(
      <Wrapper title="Tagihan Detail Page" description="Tagihan Detail Page" index={2}>
        <Loading></Loading>
      </Wrapper>
    );
  }
  else{
  return(
    <Wrapper title="Tagihan Detail Page" description="Tagihan Detail Page" index={2}>
      <div className='md:flex-row w-full mb-10'>
            
          <div className='block md:hidden'>
            <p className="text-3xl font-semibold text-gray-800">Page Mutasi Detail Id#{resPiutangDetail?.cicilan_id}</p>
            <p className="text-gray-800 text-sm mt-1">Page ini akan menampilkan mutasi dari tagihan mu</p>
        
              <table className="table-auto w-full mt-10">
                <thead>   
                  <tr className="text-left">
                    <th style={{fontSize:13}} className="border-b-2 border-t-2 border-gray-200 py-5">No</th>                
                    <th style={{fontSize:13}} className="border-b-2 border-t-2 border-gray-200 py-5">Uraian</th> 
                    <th style={{fontSize:13}} className="border-b-2 border-t-2 border-gray-200 py-5">Tipe</th> 
                    <th style={{fontSize:13}} className="border-b-2 border-t-2 border-gray-200 py-5">Nominal</th>                
                    <th style={{fontSize:13}} className="border-b-2 border-t-2 border-gray-200 py-5">Saldo Akhir</th>                               
                                          
                  </tr>     
                </thead>
                <tbody>
                  {resPiutangDetail != null? 
                    resPiutangDetail?.riwayat_pembayaran?.map((item, index) => ( 
                      <tr className="text-left" key={index}>
                        <td style={{fontSize:10}} className=" py-4">{index+1}</td>
                        <td className="py-4">
                          <p style={{fontSize:10}}>{item?.keterangan}</p>
                          <div className='justify-between flex flex-row'>
                            <p style={{fontSize:10}} className='text-green-500  text-green-500'>{item?.created_at.split(' ')[0]}</p>
                            <p style={{fontSize:10}} className='text-gray-500  mr-10'>{item?.created_at.split(' ')[1]}</p>
                          </div>
                        </td>
                        <td style={{fontSize:10}} className="py-4">{item?.type}</td>  
                        <td style={{fontSize:10}} className="py-4">{convertToRp(item?.amount)}</td>                  
                        <td style={{fontSize:10}} className="py-4">{convertToRp(item?.sisa_outstanding)}</td>
                                             
                      </tr>            
                    ))
                  : <NotFound></NotFound>     
                  } 
                </tbody>
              </table>
            </div>    
            <div className='md:block hidden'>
            <p className="text-3xl font-semibold text-gray-800">Page Mutasi Detail Id#{resPiutangDetail?.cicilan_id}</p>
            <p className="text-gray-800 text-sm mt-1">Page ini akan menampilkan semua asset yang kamu miliki</p>
        
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
                  {resPiutangDetail != null? 
                    resPiutangDetail?.riwayat_pembayaran?.map((item, index) => ( 
                      <tr className="text-left" key={index}>
                        <td className="py-4 mr-5">{index+1}</td>
                        <td className="py-4">
                          <p>{item?.keterangan}</p>
                          <div className='justify-between flex flex-row'>
                            <p className='text-green-500 text-sm'>{item?.created_at.split(' ')[0]}</p>
                            <p className='text-gray-500 text-sm mr-32'>{item?.created_at.split(' ')[1]}</p>
                          </div>
                        </td>
                        <td className="py-4 mr-5">{item?.type}</td>  
                        <td className="py-4 mr-5">{convertToRp(item?.amount)}</td>                  
                        <td className="py-4 mr-5">{convertToRp(item?.sisa_outstanding)}</td>
                                             
                      </tr>            
                    ))
                  : <NotFound></NotFound>     
                  } 
                </tbody>
              </table>
            </div>    
          </div>
    </Wrapper>
  )
  }
}