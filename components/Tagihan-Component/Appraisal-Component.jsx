import loadable from '@loadable/component'

import { useRouter } from 'next/router'
import { usePerumahanList } from '../../api/get'
import { setCIDTagihan } from '../../helper/localStorage'
import { useStoreAuth } from '../../store/auth-store'

const Image = loadable(()=>import('next/image'))

export default function AppraisalComponent(){ 
  
  const {authStore} = useStoreAuth()
  const {resPerumahan} = usePerumahanList()  

  const router = useRouter()

  const handlerClickLink = (link, store) => {    
    if(!authStore){      
      router.push({
        pathname: `/tagihan/no-auth/[tipe]`,
        query: { tipe: store },
      })
      return
    }
    setCIDTagihan(store)
    router.push({
      pathname: `/tagihan/${link}/[tipe]`,
      query: { tipe: store },
    })
  }

  return(
    <div className="min-h-full xl:min-h-screen bg-white px-4 md:px-8 lg:px-12 xl:px-14">        
      <span className="text-black font-bold  text-xl">Tagihan Properti</span>            
      <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 my-5">
        {resPerumahan?.map((e,i)=>(
          <div key={i}>
          <div onClick={()=>handlerClickLink('properti', e?.cid)} className="flex  space-x-4 cursor-pointer">
            <div>
              <Image className=" rounded-full" src={e?.image_url} alt="Logo Properti" width={50} height={50}></Image>
            </div>
            <p className="text-gray-800 font-medium md:mt-2 md:text-lg">{e?.cid_nama}</p>
          </div>        
          </div>
        ))}        
      </div>

      {/* <p className="text-black font-bold text-xl mt-10 md:mt-20">Tagihan Lain-nya</p>            
      <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-5">
        <div onClick={()=>handlerClickLink('more', 'pln')} className="flex space-x-4 cursor-pointer">
          <div>
            <Image className=" rounded-full" src={'/pln.png'} alt="Logo Properti" width={50} height={50}></Image>
          </div>
          <p className="text-gray-800 font-medium md:mt-2 md:text-lg">Listrik PLN</p>
        </div>
        <div onClick={()=>handlerClickLink('more', 'indihome')} className="flex space-x-4 cursor-pointer">
          <div>
            <Image className=" rounded-full" src={'/indihome.png'} alt="Logo Properti" width={50} height={50}></Image>
          </div>
          <p className="text-gray-800 font-medium md:mt-2 md:text-lg">Internet Indihome</p>
        </div>        
      </div> */}

    </div>
  ) 
}

