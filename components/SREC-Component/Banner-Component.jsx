import loadable from '@loadable/component'

const Image = loadable(()=>import("next/image"))

export default function BannerComponent(){
  return(
    <div className="flex flex-wrap w-full min-h-full mt-4 md:mt-14">
      <div className="w-full md:w-1/2">
        <div className="md:px-14 px-5">
          <p className="text-3xl font-semibold text-gray-800">
            Investasi Properti Secara Retail dengan Teknologi Blockchain
          </p>
          <p className="text-xl font-semibold text-green-600 pt-4">Ownership Reinvented</p>
          <p className="text-gray-800 mt-4">Investor dari seluruh dunia bisa berinvestasi properti secara mudah melalui properti yang telah ditokenisasi dengan tetap memperhatikan kaidah hukum yang berlaku.</p>
          {/* <button className="bg-green-500 text-white px-20 mt-10 rounded py-2 hover:bg-green-600">NEXT</button> */}
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-10 md:mt-0">
        <div className="flex justify-center">
        <Image className="object-contain w-full" placeholder="blur" blurDataURL={"LGHCWeD$00_1]_DiEP_N00oznLE4"} width={450} height={350} src={"/hero.webp"} alt="Image 5 Alasan SCProperty terbaik di indonesia"/>
        </div>
      </div>
    </div>
  )
}