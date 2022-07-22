import React, {useState} from 'react';
import loadable from '@loadable/component'

import {alertWarning} from '../helper/sweetalert'

import { useStorePIN } from '../store/pin-store'
import { useStoreModal } from '../store/modal-store'

const Header = loadable(()=>import('../components/Head-Component'))

export default function PinModal(){  

  const {changePINStore} = useStorePIN();
  const {closeModal} = useStoreModal();

  const [pin, setPin] = useState("");

  const [isClick, setIsClick] = useState(false);

  const handlerClickPIN = async () => {
    
    setIsClick(true);
    
    if(pin.length === 0){
      await alertWarning("Opppss!!", "Mohon lengkapi form terlebih dahulu yaaa :)");
      setIsClick(false);
      return;
    }

    if(pin.length !== 6){
      await alertWarning("Maaf", "PIN harus 6 karakter yaa :)");
      setIsClick(false);
      return;
    }
    
    setIsClick(false);
    changePINStore(pin);    
    closeModal();    
  }
  
  return(
    <React.Fragment>
      <Header title="PIN Confirmation" description="SC Property Indonesia"></Header>
      <div className="flex flex-col overflow-auto">        
        <div className="flex justify-center min-w-full">
          {/* //box class  */}
          <div className="w-full bg-white my-12 md:rounded-md md:shadow-lg md:w-96">            
            <div className="flex justify-between items-center px-7 mb-10 mt-5">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">PIN Confirmation</span>              
            </div>
            <div className="my-5 px-7 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">PIN</span>
              <input type="password" value={pin} placeholder="Your PIN" onChange={(e)=>setPin(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 hover:border-green-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Your PIN save with me!</span>
            </div>            
            <div className="my-7 px-7 flex flex-col">              
              <button onClick={handlerClickPIN} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                {(isClick)?"Loading..":"Send PIN"}
              </button>
            </div>                        
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}