import loadable from '@loadable/component'

const ImageLazy = loadable(()=>import("../ImageLazy-Component"))

export default function GuideLoginComponent({handlerNextGuide}){
  return(
    <div className="lg:min-h-screen lg:px-52 md:px-20 px-5 pt-10 w-full flex flex-wrap">
      <div className="md:w-1/2 w-full flex flex-wrap">
        <div className="md:pr-5">
          <p className="font-bold text-3xl">
            Login Page
          </p>
          <p className="mt-2 text-sm ">
            Page ini berguna untuk kamu dapat masuk ke dalam akses akun
          </p>
          <div className="mt-5">
            <div className=" mt-10">
              <span className="text-base font-semibold">1. Logo SC Property Indonesia</span>
              <p className="mt-1 text-sm">Pada bagian ini akan menampilkan Logo SC Property Indonesia, yang dapat digunakan untuk kembali ke Landing Page</p>
            </div>
            <div className=" mt-7">
              <span className="text-base font-semibold">2. Email & Password</span>
              <p className="mt-1 text-sm">Pada bagian ini kamu di berikan akses untuk memasukan email dan password yang telah terdaftar</p>
            </div>
            <div className=" mt-7">
              <span className="text-base font-semibold">3. Button Sign in</span>
              <p className="mt-1 text-sm">Pada bagian ini kamu di minta untuk menekan tombol untuk melakukan eksekusi Pengecekan Akun</p>
            </div>            
            <div className=" mt-7">
              <span className="text-base font-semibold">4. Button Sign in With Google</span>
              <p className="mt-1 text-sm">Pada bagian ini kamu di berikan pilihan untuk masuk menggunakan Akun Google yang kamu miliki</p>
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