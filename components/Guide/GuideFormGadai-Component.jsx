import loadable from '@loadable/component'

const ImageLazy = loadable(()=>import("../ImageLazy-Component"))

export default function GuideFormGadaiComponent({handlerNextGuide}){
  return(
    <div className="lg:min-h-screen lg:px-52 md:px-20 px-5 pt-10 w-full flex flex-wrap">
      <div className="md:w-1/2 w-full flex flex-wrap">
        <div className="md:pr-5">
          <p className="font-bold text-3xl">
            Form Pengajuan Gadai
          </p>
          <p className="mt-2 text-sm ">
            Page ini berfungsi untuk tempat pengajuan gadai Emas kamu
          </p>
          <div className="mt-5">
            <div className=" mt-10">
              <span className="text-base font-semibold">1. Form Input Total Jaminan</span>
              <p className="mt-1 text-sm">Form ini berguna untuk memasukan berapa banyak emas (gram) yang kamu miliki</p>
            </div>
            <div className=" mt-5">
              <span className="text-base font-semibold">2. Form Input Tempo</span>
              <p className="mt-1 text-sm">Form ini berguna untuk memasukan jangka waktu pengembalian dana Gadai</p>
            </div>
            <div className=" mt-5">
              <span className="text-base font-semibold">3. Form Input Jenis Layanan</span>
              <p className="mt-1 text-sm">Form ini berguna untuk memilih layanan antar yang di miliki oleh SC Property Indonesia</p>
            </div>            
            <div className=" mt-5">
              <span className="text-base font-semibold">4. Form Input Pilih Rekening</span>
              <p className="mt-1 text-sm">Form ini berguna untuk memasukan rekening tujuan dimana uang akan di cairkan ketika proses gadai berhasil</p>
            </div>            
            <div className=" mt-5">
              <span className="text-base font-semibold">5. Masukan Foto</span>
              <p className="mt-1 text-sm">Bagian ini berguna untuk mengirimkan foto barang yang akan di Gadai sebagi barang bukti</p>
            </div>            
          </div>
          <button onClick={handlerNextGuide} className="bg-green-400 px-7 py-2 text-white font-bold rounded hover:bg-green-300 mt-7">
            Next Guide
          </button>
        </div>
      </div>      
      <div className="md:w-1/2 w-full flex flex-wrap">
        <div className="md:pl-5">
          <ImageLazy className="object-contain w-full h-full justify-center" threshold={300} src={"/24.webp"} effect="blur" placeholderSrc={"/logo2.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>  
        </div>
      </div>
    </div>
  )
}