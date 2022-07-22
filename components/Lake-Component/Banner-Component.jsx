import { useStoreModal, useTemplateTipeModal } from "../../store/modal-store"


export default function BannerComponent(){

  const {showModal} = useStoreModal()
  const {changeTipeModal} = useTemplateTipeModal()

  const handlerClick = () => {
    changeTipeModal("quote")
    showModal()
  }

  return(
    <div className=" pb-12 bg-gwhite  xl:pt-2 pt-1 md:pb-24">
      <div className="flex flex-col text-center mt-4 md:mt-24  xl:mt-40">        
        <span className="text-green-500 font-semibold  text-3xl md:text-5xl">Beverly Lake</span>
        <span className="text-green-500 font-bold text-lg mt-7">Housing Complex</span>
        <span className="text-green-500 font-bold text-lg mb-4">Jl. Raya Dago, Cikuda, Kec. Parung Panjang, Bogor, Jawa Barat, Kabupaten Bogor, Jawa Barat</span>
      </div>
      <div className="flex justify-center  mt-5">
        <div className="flex justify-between">                     
          <button onClick={handlerClick} className="border-2 border-green-500 bg-green-500 px-5 py-2 font-semibold text-white rounded hover:bg-white hover:text-black">Get Quote</button>          
        </div>
      </div>
    </div>
  )
}