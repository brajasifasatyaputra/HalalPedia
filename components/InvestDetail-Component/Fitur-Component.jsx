import loadable from '@loadable/component'
import React from 'react'

const NotFound = loadable(()=>import("../NotFound-Component"))

export default function FiturComponent({data}){  

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
              <p className="text-gray-800 font-semibold mt-7">{e?.title}</p>
              <p className="mt-1">{e?.description}</p>
            </React.Fragment>
          ))
        }        
      </div>
    )
  }

}