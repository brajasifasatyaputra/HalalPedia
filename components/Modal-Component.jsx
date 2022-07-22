import React from 'react';
import {MdClose} from 'react-icons/md'

import {useStoreModal} from '../store/modal-store';

export default function Modal({children}){

  const {modal, closeModal} = useStoreModal();  

  return(
    <React.Fragment>
    {(modal)?(
      <React.Fragment>
        <div className={`fixed z-10 inset-0 bg-white overflow-auto md:bg-black md:bg-opacity-50`} >
          <div className="flex justify-end mr-7 mt-5 outline-none">
            <span onClick={closeModal} className={`text-gray-500 text-4xl cursor-pointer border-gray-200 border-2 rounded-full border-opacity-50 md:text-white md:border-white`}>
              <MdClose size={30}></MdClose>
            </span>
          </div>
          <div className="mb-12">
            {children}
          </div>        
        </div>      
      </React.Fragment>
    ):<div></div>}      
    </React.Fragment>
  );
}