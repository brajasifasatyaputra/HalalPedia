import { useRouter } from 'next/router';
import React  from 'react';
import { clear, setSuggestChrome } from '../helper/localStorage';

import {useStoreAuth} from '../store/auth-store'

export default function Logout(){  

  const {replace} = useRouter()

  const {logoutConfirm} = useStoreAuth()

  React.useEffect(()=>{
    if(typeof window === "undefined") return;
    logoutConfirm();
    clear();  
    setSuggestChrome("true")
    replace("/")
  },[]);

  return(
    <React.Fragment>
       
    </React.Fragment>
  );
}