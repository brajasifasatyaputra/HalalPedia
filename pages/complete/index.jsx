import React, { useEffect, useMemo, useState } from 'react'
import loadable from '@loadable/component'

import {useStatusUser} from '../../store/status-store'

const CompleteProfile = loadable(()=>import("../../components/Complete-Component"))
const Review = loadable(()=>import("../../components/Review-Component"))

export default function Compelete(){

  const { statusUserStore, checkingFromOnline } = useStatusUser()

  const [staRender, setStaRender] = useState(false);

  const statusViewRender = useMemo(()=>{    
    if(statusUserStore === -1){
      setStaRender(true)
      return null
    }
    if(statusUserStore === 2) return <CompleteProfile></CompleteProfile>
    else return <Review></Review>    

  },[statusUserStore])

  useEffect(()=>{
    if(!staRender) return
    (async()=>{
      await checkingFromOnline()
      setStaRender(false)
    })()
  },[staRender])

  return(
    <>
      {statusViewRender}
    </>
  )
}