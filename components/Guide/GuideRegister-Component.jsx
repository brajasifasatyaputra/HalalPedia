import loadable from '@loadable/component'

const ImageLazy = loadable(()=>import("../ImageLazy-Component"))

export default function GuideRegisterComponent({handlerNextGuide}){

  return(
    <div className="lg:min-h-screen md:my-20  lg:px-40 md:px-20 px-5 w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-wrap">
        <div className="md:pr-5">
          <ImageLazy className="object-contain w-full h-full" threshold={300} src={"/24.webp"} effect="blur" placeholderSrc={"/logo2.webp"} alt="Image Cover Market SC Property Coin - Emas - Logam Mulia"/>  
        </div>
      </div>
      <div className="md:w-1/2 w-full flex flex-wrap">
        <div className="md:pl-5">
          <p className="font-bold text-3xl">
            Register Page
          </p>
          <p className="mt-2 text-sm ">
            Page ini berguna untuk kamu dapat membuat akun baru
          </p>
          <div className="mt-5">
            <div className=" mt-10">
              <span className="text-base font-semibold">1. Logo SC Property Indonesia</span>
              <p className="mt-1 text-sm">Pada bagian ini akan menampilkan Logo SC Property Indonesia, yang dapat digunakan untuk kembali ke Landing Page</p>
            </div>
            <div className=" mt-7">
              <span className="text-base font-semibold">2. Form Input</span>
              <p className="mt-1 text-sm">Pada bagian ini kamu di berikan akses untuk memasukan data akun yang ingin di daftarkan</p>
            </div>
            <div className=" mt-7">
              <span className="text-base font-semibold">3. Button Register</span>
              <p className="mt-1 text-sm">Pada bagian ini kamu di minta untuk menekan tombol untuk melakukan eksekusi Pembuatan Akun</p>
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