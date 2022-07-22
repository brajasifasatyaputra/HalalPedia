import Link from 'next/link';

export default function BannerComponent(){
  return(
    <div className="min-h-full xl:min-h-screen pb-12 bg-gradient-to-r from-green-200 via-green-1  50 to-green-300 xl:pt-2 pt-1 md:pb-24">
      <div className="flex flex-col text-center mt-4 md:mt-24  xl:mt-40">
        <span className="text-green-800 font-bold text-lg mb-4">Apa itu SCProperty?</span>
        <span className="text-green-900 font-semibold  text-3xl md:text-5xl">Investasi Properti yang Aman dan Mudah</span>
      </div>
      <div className="flex justify-center mt-10 md:mt-20">
        <div className="flex justify-between">
          <Link passHref href="/invest">
            <button className="bg-white text-green-400 px-5 py-2 rounded font-semibold mr-4 ring-1 ring-white hover:bg-gray-200">Mulai Investasi</button>
          </Link>
          <Link passHref href="/learn">
            <button className="border-2 border-white px-5 py-2 font-semibold text-white rounded hover:bg-white hover:text-black">Mulai Pelajari</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
