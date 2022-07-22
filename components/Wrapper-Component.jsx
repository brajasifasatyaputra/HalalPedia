import React, {useEffect, useMemo} from 'react';
import loadable from '@loadable/component'

const Navigation = loadable(()=>import("./Navigation-Component"))
const Head = loadable(()=>import("./Head-Component"))

const Modal = loadable(()=> import('./Modal-Component'));
const Footer = loadable(()=>import('./Foot-Component')) 

const PinModal = loadable(()=>import('../modal/Pin')) ;
const ChangePinModal = loadable(()=>import('../modal/ChangePin'));
const ChangePasswordModal = loadable(()=>import('../modal/ChangePassword'));
const Akad = loadable(()=>import('../modal/Akad'));
const DetailPawn = loadable(()=>import("../modal/DetailGadai"));
const ChangePhone = loadable(()=>import("../modal/ChangePhone"))
const Topup = loadable(()=>import("../modal/Topup"))
const TarikSaldo = loadable(()=>import("../modal/WithdrawSaldo"))
const Suggest = loadable(()=>import('../modal/Suggest'))

import { useTemplateTipeModal } from '../store/modal-store'
import { useStoreAuth } from '../store/auth-store'
import { getToken, setStatusUser } from '../helper/localStorage';
import { checkUserStatusHandler, getAsset } from '../api/get';
import { useStatusUser } from '../store/status-store';

// import firebase from 'firebase'

// let messaging = null

// if(!('safari' in window && 'pushNotification' in window.safari)){
//   messaging = firebase.messaging();
// }

export default function Wrapper({title, description, children}){

  const {loginConfirm, logoutConfirm} = useStoreAuth();  
  const {tipeModal} = useTemplateTipeModal();

  const {setStatusUserStore} = useStatusUser()

  useEffect(()=>{
    if(typeof window === 'undefined') return;
    const token = getToken();
    if(token != null || token != undefined){      
      (async()=>{
        loginConfirm();
        const statusCheck = await checkUserStatusHandler();      
        await getAsset()
        setStatusUser(JSON.stringify(statusCheck))
        setStatusUserStore(statusCheck)  
      })()
    } 
    else{      
      logoutConfirm();
    }    
    // if(!('safari' in window && 'pushNotification' in window.safari)){ 
    //   if(messaging == null) return
    //   messaging.onMessage((payload) => {    
    //     navigator.serviceWorker.getRegistration().then(req => {
    //       req.showNotification(payload?.notification?.title, {body:payload?.notification?.body})
    //     })        
    //   });
    // }
  },[]);

  const modalRender = useMemo(()=>{

    if(tipeModal === "pin"){
      return <PinModal></PinModal>;
    }
    else if(tipeModal === "topup"){
      return <Topup></Topup>
    }
    else if(tipeModal === "change-phone"){
      return <ChangePhone></ChangePhone>
    }
    else if(tipeModal === "change-pin"){
      return <ChangePinModal></ChangePinModal>
    }
    else if(tipeModal === "change-password"){
      return <ChangePasswordModal></ChangePasswordModal>
    }
    else if(tipeModal === "akad"){
      return <Akad></Akad>
    }
    else if(tipeModal === "detail-gadai"){
      return <DetailPawn></DetailPawn>
    }    
    else if(tipeModal === "tarik-saldo"){
      return <TarikSaldo></TarikSaldo>
    }
    else if(tipeModal === "suggest"){
      return <Suggest></Suggest>
    }
    else{
      return null
    }

  },[tipeModal]);

  return(
    <React.Fragment>
      <Head title={title} description={description}></Head>            
      <Modal>
        {modalRender}
      </Modal>
      <Navigation className="z-50"></Navigation>
      <div className="min-h-screen bg-white z-0">
        {children}
      </div>
      <Footer></Footer>
    </React.Fragment>
  );
}