import loadable from '@loadable/component'
import { convertToRp } from '../../helper/converter'

const NotFound = loadable(()=>import("../NotFound-Component"))

export default function AppraisalComponent({data}){

  if(data == null){
    return(
      <div className="mt-10">
        <NotFound></NotFound>
      </div>
    )
  }
  else{
    return(
      <div className="mt-10">        
        <p className="text-gray-800 font-semibold mt-7">Lembaga Penilaian</p>
        <p className="mt-1">{data?.inspection_title}</p>
        
        <p className="text-gray-800 font-semibold mt-7">Tanggal Penilaian</p>
        <p className="mt-1">{data?.inspection_date}</p>

        <p className="text-gray-800 font-semibold mt-7">Tanggal Valuasi Penilaian</p>
        <p className="mt-1">{data?.valuation_date}</p>

        <p className="text-gray-800 font-semibold mt-7">Tanggal Pelaporan Penilaian</p>
        <p className="mt-1">{data?.reporting_date}</p>

        <p className="text-gray-800 font-semibold mt-7">Market Value</p>
        <p className="mt-1">{convertToRp(data?.market_value)}</p>

        <p className="text-gray-800 font-semibold mt-7">{data?.appraisal_doc_title}</p>
        <a href={data?.appraisal_doc_url} target="blank" className="mt-1 text-blue-500 cursor-pointer">Donwload File</a>
      </div>
    )
  }

}