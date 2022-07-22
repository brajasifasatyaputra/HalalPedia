// import { useEffect } from 'react'
// import { initialFirebase } from '../helper/firebase'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {

  // useEffect(()=>{
  //   initialFirebase()
  // },[])

  return <Component {...pageProps} />
}

export default MyApp
