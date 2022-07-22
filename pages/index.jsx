import loadable from '@loadable/component'
import { useEffect } from 'react'
import { getSuggestChromer, setSuggestChrome } from '../helper/localStorage'
import { useStoreModal, useTemplateTipeModal } from '../store/modal-store'

const Wrapper = loadable(()=>import("../components/Wrapper-Component"))
const BannerComponent = loadable(()=>import('../components/Dashboard-Component/Banner-Component'))
const AppraisalComponent = loadable(()=>import('../components/Dashboard-Component/Appraisal-Component'))
const Information = loadable(()=>import('../components/Dashboard-Component/Information-Component'))
const Information1 = loadable(()=>import('../components/Dashboard-Component/Information-Component1'))
const RetailComponent = loadable(()=>import('../components/Dashboard-Component/Retail-Component'))
const NewsComponent = loadable(()=>import('../components/Dashboard-Component/News-Component'))
const Promotion = loadable(()=>import('../components/Dashboard-Component/Promotion-Component'))
const Tutorial = loadable(()=>import("../components/Dashboard-Component/TutorialInvest-Component"))
const Rekap = loadable(()=>import("../components/Dashboard-Component/Rekap-Component"))
// const Testimoni = loadable(()=>import("../components/Dashboard-Component/Testimoni-Component"))

export default function Home() {  

  const {showModal} = useStoreModal()
  const {changeTipeModal} = useTemplateTipeModal()

  useEffect(()=>{
    const tmp = getSuggestChromer()    
    if(tmp === null || tmp === "" || tmp === "false"){
      changeTipeModal("suggest")
      showModal()
      setSuggestChrome("true")            
    }
  },[])

  return (    
    <Wrapper title="Home - SC Property" description="Page for show compact infomation about SC Property">    
      <BannerComponent></BannerComponent>          
      <AppraisalComponent></AppraisalComponent>                  
      <Information1 
        title={"Real estate is still the best investment you can make."} 
        desc={"According to these nine Advisors in The Oracles, who made millions by investing in real estate, it’s still the best way to build wealth. Read more at"} 
        size={3} 
        link={true}>            
      </Information1>
      <RetailComponent></RetailComponent> 
      <Information 
        title={"Sesuai arahan OJK (Inovasi Keuangan Digital) pada tanggal 23 April 2021 pada zoom meeting, kluster Property Investment Management SC Property diarahkan ke POJK NOMOR 57 /POJK.04/2020, Penawaran Efek melalui Layanan Urun Dana."} 
        desc={"Penawaran Efek melalui Layanan Urun Dana Berbasis Teknologi Informasi yang selanjutnya disebut Layanan Urun Dana adalah penyelenggaraan layanan penawaran efek yang dilakukan oleh penerbit untuk menjual efek secara langsung kepada pemodal melalui jaringan sistem elektronik yang bersifat terbuka."} 
        size={2}>            
      </Information>         
      <NewsComponent></NewsComponent>     
      <Promotion></Promotion>  
      <Information 
        title={"Easy & Compliant"} 
        desc={"SREC memberikan solusi kepada investor  untuk membeli properti secara terjangkau dengan sistem tokenized berdasarkan hukum Indonesia yang menggunakan teknologi blockchain Ethereum."} 
        size={3}>            
      </Information>           
      <Tutorial></Tutorial>
      <Rekap></Rekap>                                           
      {/* <Testimoni></Testimoni> */}
    </Wrapper>          
  )
}
