import loadable from '@loadable/component'

const Image = loadable(()=>import('../ImageLazy-Component'))

export default function PromotionComponent(){
  return(
    <>
      <div className="flex justify-between">
        <div className="md:px-16 pt-20">
          <div className="rounded-t shadow-2xl bg-green-300 flex justify-between pt-8 pb-8 pl-8 pr-8">
            <div className="md:w-4/8">
              <div className="flex flex-wrap justify-center">
                <Image className="object-contain w-full h-full rounded-t" width={300} height={200} src={"/uidesign.webp"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image 5 Alasan SCProperty terbaik di indonesia"/>
              </div>
            </div>
            <div className="md:w-9/2">
              <div>
                <p className="text-xl font-semibold mb-4 text-gray-800">5 Alasan SCProperty menjadi tempat Investasi properti terbaik di Indonesia</p>
                <ul className="text-base font-light">
                  <li className="mb-3 text-sm">1. Properti di appraisal oleh KJPP (Kantor Jasa Penilaian Publik) independent dan properti yang langsung memberikan keuntungan.</li>
                  <li className="mb-3 text-sm">2. Sistem dilengkapi dengan teknologi blockchain Ethereum.</li>
                  <li className="mb-3 text-sm">3. Transaksi mudah dan aman.</li>
                  <li className="mb-3 text-sm">4. Bisa diakses melalui multiplatform, website, android dan ios.</li>
                  <li className="mb-3 text-sm">5. Layanan after sales dengan live chat dan WA message.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-t shadow-2xl bg-green-200 flex justify-between pt-8 pb-8 pl-8 pr-8 mt-10 md-20">
            <div className="md:w-9/2">
              <div>
                <p className="text-xl font-semibold mb-4 text-gray-800">5 Langkah mudah menjadikan aset properti anda lebih produktif</p>
                <ul className="text-base font-light">
                  <li className="mb-3 text-sm">1. Daftarkan diri anda SC Properti dengan isi form pendaftaran.</li>
                  <li className="mb-3 text-sm">2. Masuk ke menu My Properties .</li>
                  <li className="mb-3 text-sm">3. Daftarkan properti anda dengan isi form dan melengkapi data-data yang diminta.</li>
                  <li className="mb-3 text-sm">4. Tunggu verifikasi dari kami.</li>
                  <li className="mb-3 text-sm">5. Selanjutnya biar kan asset anda bekerja untuk anda.</li>
                </ul>
              </div>
            </div>
            <div className="md:w-4/8">
              <div className="flex flex-wrap justify-center">
                <Image className="object-contain w-full h-full rounded-t" width={300} height={200} src={"/UX.webp"} effect="blur" placeholderSrc={"/favicon.ico"} alt="Image 5 Alasan SCProperty terbaik di indonesia"/>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </>
  )
}
