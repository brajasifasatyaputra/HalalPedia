import loadable from '@loadable/component'

const Wrapper = loadable(()=>import('../components/Wrapper-Component'))
const GuideLogin = loadable(()=>import("../components/Guide/GuideLogin-Component"))
const GuideRegister = loadable(()=>import("../components/Guide/GuideRegister-Component"))
const GuideFormGadai = loadable(()=>import("../components/Guide/GuideFormGadai-Component"))
const GuidePerpanjang = loadable(()=>import("../components/Guide/GuidePerpanjang-Component"))
const GuideMarket = loadable(()=>import("../components/Guide/GuideMarket-Component"))

export default function Guide(){

  const handlerNextGuideLogin = () => {
    const offsetTop = document.querySelector("#guideRegister").offsetTop
    scroll({
      top:offsetTop-100,
      behavior:"smooth"
    })
  }

  const handlerNextGuideRegister = () => {
    const offsetTop = document.querySelector("#guideFormGadai").offsetTop
    scroll({
      top:offsetTop,
      behavior:"smooth"
    })
  }

  const handlerNextGuideFormGadai = () => {
    const offsetTop = document.querySelector("#guidePerpanjang").offsetTop
    scroll({
      top:offsetTop,
      behavior:"smooth"
    })
  }

  const handlerNextGuidePerpanjang = () => {
    const offsetTop = document.querySelector("#guideMarket").offsetTop
    scroll({
      top:offsetTop,
      behavior:"smooth"
    })
  }

  const handlerNextGuideMarket = () => {
    const offsetTop = document.querySelector("#guideLogin").offsetTop
    scroll({
      top:offsetTop,
      behavior:"smooth"
    })
  }

  return(
    <Wrapper title="User Guide - SC Property Indonesia" description="Page ini akan menampilkan seluruh penjelasan cara menggunakan website SC Property Indonesia">      
      <div className="">
        <div id="guideLogin">
          <GuideLogin handlerNextGuide={handlerNextGuideLogin}></GuideLogin>
        </div>
        <div id="guideRegister">
          <GuideRegister handlerNextGuide={handlerNextGuideRegister}></GuideRegister>        
        </div>
        <div id="guideFormGadai">
          <GuideFormGadai handlerNextGuide={handlerNextGuideFormGadai}></GuideFormGadai>
        </div>
        <div id="guidePerpanjang">
          <GuidePerpanjang handlerNextGuide={handlerNextGuidePerpanjang}></GuidePerpanjang>
        </div>
        <div id="guideMarket">
          <GuideMarket handlerNextGuide={handlerNextGuideMarket}></GuideMarket>
        </div>
      </div>
    </Wrapper>
  )
}