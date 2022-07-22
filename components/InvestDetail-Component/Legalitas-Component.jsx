import React from 'react'

import loadable from '@loadable/component'

const NotFound = loadable(()=>import("../NotFound-Component"))

export default function LegalitasComponent({data}){

  data = (data||[])

  if(data?.length === 0){
    return(
      <div className="mt-10">
        <NotFound></NotFound>
      </div>
    )
  }
  else{
    return(
      <div className="w-full mt-10">
        {
          data?.map((e,i)=>(
            <React.Fragment key={i}>
              <p className="text-gray-800 font-semibold mt-7">{e?.doc_title}</p>
              <a href={e?.doc_url} target="blank" className="mt-1 text-blue-500 cursor-pointer">Donwload File</a>
            </React.Fragment>
          ))
        }        
      </div>
    )
  }
}