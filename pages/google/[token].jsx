import React  from 'react';
import { checkUserStatusHandler, getAsset } from '../../api/get';
import { setStatusUser, setToken } from '../../helper/localStorage';
import {useStoreAuth} from '../../store/auth-store'
import {useStatusUser} from '../../store/status-store'

export default function Google(){  

  const {loginConfirm} = useStoreAuth()
  const {setStatusUserStore} = useStatusUser()

  React.useEffect(()=>{        
    (async()=>{
      
      if(typeof window === "undefined") return;      
      
      loginConfirm();          
      
      const token = window?.location?.href?.split("/")[4]
      
      setToken(token)
      
      const data = await checkUserStatusHandler()      

      const _ = await getAsset()
      
      setStatusUser(JSON.stringify(data))
      setStatusUserStore(data)

      if(data === 4){
        window.location.href = "/"
      }
      else if(data < 4){
        window.location.href = "/"
      }
      else{
        window.location.href = "/login"
      }
      
      
    })()    
  },[]);

  return(
    <React.Fragment>       
    </React.Fragment>
  );
}