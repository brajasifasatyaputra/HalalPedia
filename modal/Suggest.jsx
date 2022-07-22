
import loadable from '@loadable/component'

import { useStoreModal } from '../store/modal-store'

const Header = loadable(()=>import('../components/Head-Component'))

export default function SuggestModal(){  
  
  const {closeModal} = useStoreModal();

  return(
    <>
      <Header title="Suggest" description="SC Property Indonesia"></Header>
      <div className="flex flex-col overflow-auto">        
        <div className="flex justify-center min-w-full">
          {/* //box class  */}
          <div className="w-full bg-white my-12 md:rounded-md md:shadow-lg md:w-96">            
            <div className="flex justify-between items-center px-7 mb-10 mt-5">
              <span className="text-2xl font-semibold text-gray-800 text-center cursor-pointer">
                Gunakan Chrome untuk Pengalaman Terbaik
              </span>              
            </div>            
            <div className="my-7 px-7 flex flex-col">              
              <button onClick={()=>closeModal()} className="bg-green-300 text-white font-bold py-3 cursor-pointer rounded-md hover:bg-green-400">
                Close
              </button>
            </div>                        
          </div>
        </div>
      </div>
    </>
  );

}