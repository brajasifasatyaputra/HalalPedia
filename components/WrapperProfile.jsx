import loadable from '@loadable/component'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { useStoreModal, useTemplateTipeModal } from '../store/modal-store';

const Wrapper = loadable(()=>import("./Wrapper-Component"))

export default function WrapperProfile({title, description, children, index}){

  index  = (index||0)

  const {showModal} = useStoreModal()
  const {changeTipeModal} = useTemplateTipeModal()

  const {push} = useRouter()

  const [navigation, setNavigation] = useState(index);

  const handlerNavigation = (index, url) => {
    setNavigation(index)
    push(url)
  }

  const handlerShowAlert = (index, modal) => {
    setNavigation(index)
    changeTipeModal(modal)
    showModal()
  }

  return(
    <Wrapper title={title} description={description}>
      <div className="w-full md:px-12 px-4 mb:mt-20 mt-5">
        <div className="w-full flex flex-wrap">
          <div className="w-72 border border-gray-300 rounded hidden lg:block py-4 mr-5">
            <div className="mt-4">              
              <div onClick={()=>handlerNavigation(0, "/my-asset")} className={`${(navigation === 0)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">My Asset</p>
              </div>
              <div onClick={()=>handlerNavigation(1, "/my-properties")} className={`${(navigation === 1)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">Portofolio</p>
              </div>              

              <div className="border border-gray-100 my-5"></div>

              <div onClick={()=>handlerNavigation(2, "/piutang")} className={`${(navigation === 2)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">Mutasi Tagihan</p>
              </div>
              <div onClick={()=>handlerNavigation(8, "/mutation")} className={`${(navigation === 8)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">Riwayat</p>
              </div>
              <div onClick={()=>handlerNavigation(9, "/mutation-withdraw")} className={`${(navigation === 9)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">Mutasi Penarikan</p>
              </div>
              {/* <div onClick={()=>handlerNavigation(2, "/bill")} className={`${(navigation === 2)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">My Bill</p>
              </div> */}
              {/* <div onClick={()=>handlerNavigation(2, "/register-properties")} className={`${(navigation === 2)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3 cursor-pointer`}>
                <p className="pl-4">Register Properties</p>
              </div> */}

              <div className="border border-gray-100 my-5"></div>

              <div onClick={()=>handlerNavigation(3, "/akun/profile")} className={`${(navigation === 3)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">Profile</p>
              </div>
              <div onClick={()=>handlerNavigation(4, "/akun/setting/profile")} className={`${(navigation === 4)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">Setting Profile</p>
              </div>              
              <div onClick={()=>handlerNavigation(6, "/bank")} className={`${(navigation === 6)?"bg-green-50 text-base text-green-500 font-semibold":"bg-white text-sm text-gray-800 hover:text-gray-800"}w-full  px-4 py-3  cursor-pointer`}>
                <p className="pl-4">Setting Bank</p>
              </div>                            
              
            </div>
          </div>
          <div className="flex-1 w-full md:p-6 md:rounded md:border md:border-gray-200">
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}