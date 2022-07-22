import React,{ useState } from 'react';
import loadable from '@loadable/component'

import { useStoreModal } from '../store/modal-store'
import { useStoreAkad } from '../store/akad-store'

import { useAkad } from '../api/get'

const Header = loadable(()=>import('../components/Head-Component'))

export default function AkadModal() {

  const { resAkad, loading } = useAkad();    

  const { closeModal } = useStoreModal();  
  const { confirmed,rejected } = useStoreAkad();

  const handlerAccept = () => {
    setIsClick(true);
    confirmed();
    setIsClick(false)
    closeModal();
  } 

  const handlerReject = () => {
    setIsClick(true);
    rejected();
    setIsClick(false)
    closeModal();
  }  

  const [isClick, setIsClick] = useState(false);   

  if(loading){
    return (
      <React.Fragment>
        <Header title="Akad Form" description="SC Property Indonesia"></Header>
        <div className="flex flex-col overflow-auto">
          <div className="flex justify-center min-w-full">
            <span className="text-xl">Loading..</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
  else{  
  return (
    <React.Fragment>
      <Header title="Akad Form" description="SC Property Indonesia"></Header>
      <div className="flex flex-col overflow-auto">
        <div className="flex justify-center min-w-full">
          {/* //box class  */}
          <div className="w-full bg-white md:px-20 md:rounded-md md:w-3/4">
            {/* <div className="flex justify-between px-0 mb-10 mt-5">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Akad Form</span>
            </div> */}
            <div className="flex justify-center px-0 mt-16 mb-5" >
              <iframe className="w-full min-h-screen " src={resAkad?.replace(" ","%20")}></iframe>
            </div>
            <div className="my-12 px-7 flex flex-row">
              <button onClick={handlerAccept} className="mr-2 flex-1 bg-yellow-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-yellow-400">
                {(isClick) ? "Loading.." : "Accept"}
              </button>
              <button onClick={handlerReject} className="ml-2 flex-1 bg-white text-yellow-400 font-bold py-3 cursor-pointer rounded-md border-yellow-400 border-2">
                {(isClick) ? "Loading.." : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  }
}