import React from 'react';
import loadable from '@loadable/component'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))
const BannerComponent = loadable(()=>import('../../components/Tagihan-Component/Banner-Component'))
const AppraisalComponent = loadable(()=>import('../../components/Tagihan-Component/Appraisal-Component'))
const Testimoni = loadable(()=>import("../../components/Tagihan-Component/Testimoni-Component"))
const Galery = loadable(()=>import("../../components/Tagihan-Component/Galery-Component"))
const ContactUs = loadable(()=>import("../../components/Tagihan-Component/ContactUs-Component"))
export default function Home() {  

  return (    
    <Wrapper title="Home - SC Property" description="Page for show compact infomation about SC Property">    
      <BannerComponent></BannerComponent>          
      <AppraisalComponent></AppraisalComponent>                                                                        
    </Wrapper>          
  )
}
