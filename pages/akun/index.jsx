import loadable from '@loadable/component'
import { getEmailUserLogin, getUserLogin } from '../../helper/localStorage'

import {AiOutlineIdcard} from 'react-icons/ai'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))

export default function Akun(){
  return(
    <Wrapper title="Akun Page - Scproperty" description="Page ini akan menjadi menu untuk kamu memilih otoritas yang kamu miliki terhadap akun mu">
      <div className="md:px-14 px-4 py-10">
        <p className="text-4xl font-semibold text-gray-800">Account Page</p>
        <p className="text-sm mt-2">
          <span className="font-bold">{getUserLogin()?.toUpperCase()} ( </span>          
          <span className="text-blue-600">{getEmailUserLogin()}</span>
          <span className="font-bold"> )</span>
        </p>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div className="w-full shadow-lg rounded">
            <div className="p-4">
              <AiOutlineIdcard size={40}></AiOutlineIdcard>
              <p className="mt-4 text-xl font-semibold text-gray-800"></p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
