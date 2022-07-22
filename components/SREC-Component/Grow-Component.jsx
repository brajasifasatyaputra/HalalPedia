export default function GrowComponent(){
  return(
    <div className="min-h-full xl:min-h-screen w-full md:px-14 px-5">
      <p className="text-3xl text-gray-800 text-center mt-20">Grow a global, Digital real estate portfolio</p>
      <p className="text-gray-800 text-center mt-1">Here are some reasons why you can choose SREC as a payment alternative</p>
      <div className="w-full flex flex-wrap md:mt-20 mb-20 md:mb-0">
        <div className="w-full md:w-1/2">
          <div className="pr-5">
            <div className="mt-10 md:mt-0">
              <p className="text-xl font-semibold text-green-600">Token yang Unik</p>
              <p className="text-gray-800 mt-2">Ownership dari setiap properti didistribusikan ke sejumlah token yang terbatas. Berdasarkan jumlah token, pemilik dapat memperoleh pendapatan dari sewa, dan memiliki hak suara pada properti tersebut.</p>
            </div>
            <div className="mt-10">
              <p className="text-xl font-semibold text-green-600">Special Purpose Company</p>
              <p className="text-gray-800 mt-2">Setiap properti dimiliki oleh Perseroan Terbatas (SPC). Setiap SPC diberi sejumlah token tertentu yang tersedia untuk dibeli.</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mt-10 md:mt-0">
            <p className="text-xl font-semibold text-green-600">Weekly Rent Payments</p>
            <p className="text-gray-800 mt-2">Weekly Rent Payments Pembayaran bagi hasil dari sewa dibayarkan setiap minggu berupa token SREC yang dapat diambil dalam bentuk Rupiah setiap saat.</p>
          </div>
          <div className="mt-10">
            <p className="text-xl font-semibold text-green-600">Pengelolaan Properti</p>
            <p className="text-gray-800 mt-2">Setiap properti di SC Property memiliki perusahaan pengelola properti yang mengelola properti atas nama pemilik SC Property. Perusahaan pengelola properti mencari penyewa, mengumpulkan uang sewa, dan mengelola perbaikan terhadap properti sehingga pemilik Token SC Property tidak perlu melakukan hal tersebut.</p>
          </div>          
        </div>
      </div>
    </div>
  )
}