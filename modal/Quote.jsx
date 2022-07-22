import React, { useState } from 'react';
import loadable from '@loadable/component'

import { alertSuccess, alertWarning, alertError, alertQuestion } from '../helper/sweetalert'

import { useStoreModal } from '../store/modal-store'

const Header = loadable(()=>import('../components/Head-Component'))

export default function GetQuotesModal() {

  const { closeModal } = useStoreModal();

  const [name, setName] = useState("");
  const [notelp, setNotelp] = useState("");
  const [email, setEmail] = useState("");

  const [isClick, setIsClick] = useState(false);

  const handlerClick = async () => {

    if(isClick) return

    setIsClick(true);

    if (name.length === 0 || notelp.length === 0 || email.length === 0) {
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    
    setIsClick(false);
    closeModal();
  }

  return (
    <React.Fragment>
      <Header title="Get Quote" description="SC Property Indonesia"></Header>
      <div className="flex flex-col overflow-auto">
        <div className="flex justify-center min-w-full">
          {/* //box class  */}
          <div className="w-full bg-white my-12 md:rounded-md md:shadow-lg md:w-96">
            <div className="flex justify-between items-center px-7 mb-10 mt-5">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Get Quote</span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Name</span>
              <input type="text" value={name} placeholder="Your Name" onChange={(e) => setName(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Your Password save with me!</span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Phone Number</span>
              <input type="number" value={notelp} placeholder="Ex: 081787671333" onChange={(e) => setNotelp(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Email</span>
              <input type="email" value={email} placeholder="Ex: rezaxxxx@gmail.com" onChange={(e) => setEmail(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="my-7 px-7 flex flex-col">
              <button onClick={handlerClick} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                {(isClick) ? "Loading.." : "Sumbit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}