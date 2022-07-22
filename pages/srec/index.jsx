import loadable from '@loadable/component'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))

const Retail = loadable(()=>import("../../components/SREC-Component/Retail-Component"))
const Banner = loadable(()=>import("../../components/SREC-Component/Banner-Component"))
const Information = loadable(()=>import("../../components/Dashboard-Component/Information-Component"))
const Download = loadable(()=>import("../../components/SREC-Component/Download-Component"))
const Grow = loadable(()=>import("../../components/SREC-Component/Grow-Component"))

export default function SREC(){
  return(
    <Wrapper title={"SREC - Kotakjualan.com"} description={"Page ini akan memperkenalkan SREC Coin pada pengunjung"}>
      <Banner></Banner>          
      <Retail></Retail>   
      <Information 
        title={"Easy & Compliant"} 
        desc={"SREC memberikan solusi kepada investor  untuk membeli properti secara terjangkau dengan sistem tokenized berdasarkan hukum Indonesia yang menggunakan teknologi blockchain Ethereum."} 
        size={3}>            
      </Information>                
      <Download></Download>     
      <Grow></Grow>            
    </Wrapper>
  )
}