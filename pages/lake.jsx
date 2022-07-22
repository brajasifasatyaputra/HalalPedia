import React from 'react';
import loadable from '@loadable/component'

const Wrapper = loadable(()=>import("../components/Wrapper-Component"))
const BannerComponent = loadable(()=>import('../components/Lake-Component/Banner-Component'))
const AppraisalComponent = loadable(()=>import('../components/Lake-Component/Appraisal-Component'))
const Testimoni = loadable(()=>import("../components/Lake-Component/Testimoni-Component"))
const Galery = loadable(()=>import("../components/Lake-Component/Galery-Component"))
const ContactUs = loadable(()=>import("../components/Lake-Component/ContactUs-Component"))
export default function Home() {  

  return (    
    <Wrapper title="Home - SC Property" description="Page for show compact infomation about SC Property">    
      <BannerComponent></BannerComponent>          
      <AppraisalComponent></AppraisalComponent>                                                                  
      <Testimoni></Testimoni>
      <Galery/>
      <ContactUs/>
    </Wrapper>          
  )
}
