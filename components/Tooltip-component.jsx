import {BsFillCaretLeftFill} from 'react-icons/bs'

export default function TooltipComponent({text, width}){

  width = (width||"auto")

  return(
    <div className="relative ml-2">
      <BsFillCaretLeftFill></BsFillCaretLeftFill>
      <div className={`bg-black text-white font-semibold w-${width} py-1 px-2 text-center absolute bottom-1 left-4 rounded`}>
        <p className="">{text}</p>
      </div>
    </div>
  )
}