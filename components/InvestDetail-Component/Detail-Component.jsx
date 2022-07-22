import { convertToRp } from "../../helper/converter";

export default function DetailComponent({data}){
  return(
    <div className="pt-10 space-y-5">
      <div className="flex flex-wrap">
        <div className="w-1/2 space-y-5">
          
          <div className="flex flex-col">
            <p className="text-gray-800 font-semibold">Imbal Hasil</p>
            <p>{data?.bagi_hasil}</p>
          </div>
          
          <div className="flex flex-col">
            <p className="text-gray-800 font-semibold">Target</p>
            <p>{convertToRp(data?.idr_max)}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-gray-800 font-semibold">Durasi Proyek</p>
            <p>{data?.durasi} Hari</p>
          </div>  

          <div className="flex flex-col">
            <p className="text-gray-800 font-semibold">Tanggal Mulai</p>
            <p>{data?.project_date}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-gray-800 font-semibold">Alamat Token</p>
            <a href={data?.token_address} className="text-blue-500 cursor-pointer" target="blank">Click Here</a>
          </div>
        </div>

        <div className="w-1/2 space-y-5">
          
          <div className="flex flex-col text-left">
            <p className="text-gray-800 font-semibold">Minimal Investasi</p>
            <p>{convertToRp(data?.price)}</p>
          </div>

          <div className="flex flex-col text-left">
            <p className="text-gray-800 font-semibold">Terkumpul</p>
            <p>{convertToRp(data?.idr_progress)}</p>
          </div>

          <div className="flex flex-col text-left">
            <p className="text-gray-800 font-semibold">Lot Tersedia</p>
            <p>{`${data?.lot_available}/${data?.token_max}`}</p>
          </div>

          <div className="flex flex-col text-left">
            <p className="text-gray-800 font-semibold">Tanggal Selesai</p>
            <p>{(data?.project_end_date == null)?"":data?.project_end_date}</p>
          </div>

          <div className="flex flex-col text-left">
            <p className="text-gray-800 font-semibold">Alamat</p>
            <a href={data?.gmaps_url} className="text-blue-500 cursor-pointer" target="blank">Click Here</a>
          </div>
        </div>
      </div>                                                                                          
    </div>
  )  
}