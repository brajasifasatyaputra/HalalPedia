import loadable from '@loadable/component'

const ImageLazy = loadable(()=>import("../ImageLazy-Component"))

export default function GuidePerpanjangComponent({handlerNextGuide}){
  return(
    <div className="lg:min-h-screen lg:px-40 md:px-20 px-5  pt-10 w-full flex flex-wrap">
      <div className="md:w-1/2 w-full flex flex-wrap">
        <div className="md:pl-5">
          <ImageLazy className="object-contain w-full h-full justify-center" threshold={300} src={"/24.webp"} effect="blur" placeholderSrc={"/logo2.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>  
        </div>
      </div>
      <div className="md:w-1/2 w-full flex flex-wrap">
        <div className="md:pr-5">
          <p className="font-bold text-3xl">
            Form Perpanjang Gadai
          </p>
          <p className="mt-2 text-sm ">
            Page ini berfungsi untuk melakukan perpanjangan Gadai
          </p>
          <div className="mt-5">
            <div className=" mt-10">
              <span className="text-base font-semibold">1. Tempo</span>
              <p className="mt-1 text-sm">Form input ini berguna untuk memilih jangka waktu lamanya sebuah Gadai ingin di perpanjang</p>
            </div>
            <div className=" mt-5">
              <span className="text-base font-semibold">2. Form Permbayaran</span>
              <p className="mt-1 text-sm">Form ini berguna untuk menampilkan besar biaya yang akan di bayarkan dan memilih bank yang akan digunakan sebagai metode pembayaran</p>
            </div>
            <div className=" mt-5">
              <span className="text-base font-semibold">3. Secure PIN</span>
              <p className="mt-1 text-sm">Setiap transaksi yang terjadi pada SC Property Indonesia akan di minta kan PIN untuk keamanan pengguna</p>
            </div>                        
          </div>
          <button onClick={handlerNextGuide} className="bg-green-400 px-7 py-2 text-white font-bold rounded hover:bg-green-300 mt-7">
            Next Guide
          </button>
        </div>
      </div>            
    </div>
  )
}