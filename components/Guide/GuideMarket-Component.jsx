import loadable from '@loadable/component'

const ImageLazy = loadable(()=>import("../ImageLazy-Component"))

export default function GuideMarketComponent({handlerNextGuide}){
  return(
    <div className="lg:min-h-screen lg:px-52 md:px-20 px-5 pt-10 w-full flex flex-wrap">
      <div className="md:w-1/2 w-full flex flex-wrap">
        <div className="md:pr-5">
          <p className="font-bold text-3xl">
            Market Page
          </p>
          <p className="mt-2 text-sm ">
            Page ini berfungsi menampilkan Emas fisik yang di jual
          </p>
          <div className="mt-5">
            <div className=" mt-10">
              <span className="text-base font-semibold">1. Page Landing Market</span>
              <p className="mt-1 text-sm">Page ini akan menampilkan seluruh Koleksi Emas fisik yang di jual oleh SC Property Indonesia</p>
            </div>
            <div className=" mt-5">
              <span className="text-base font-semibold">2. Page Detail Market</span>
              <p className="mt-1 text-sm">Page ini akan menampilkan detail data Emas fisik, beserta Spesifikasinya</p>
            </div>
            <div className=" mt-5">
              <span className="text-base font-semibold">3. Keranjang</span>
              <p className="mt-1 text-sm">Setelah melakukan pembelian maka barang akan di masukan kedalam keranjang, Dan page ini akan menampilkan seluruh data yang ada pada keranjang user</p>
            </div>            
            <div className=" mt-5">
              <span className="text-base font-semibold">4. Checkout</span>
              <p className="mt-1 text-sm">Page ini akan menampilkan sub total dan akan memberikan akses pada kamu untuk memilih alamat pengiriman dan kurir</p>
            </div>            
            <div className=" mt-5">
              <span className="text-base font-semibold">5. Pembayaran</span>
              <p className="mt-1 text-sm">Page ini akan menampilkan total dari biaya yang akan kamu bayarkan, dan kamu bisa memilih bank untuk melakukan metode pembayaran</p>
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