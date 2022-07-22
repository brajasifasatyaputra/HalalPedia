import React, { useState }  from 'react';
import loadable from '@loadable/component'

import {useFAQ, faqFetcher} from '../api/get';

const Wrapper = loadable(()=>import("../components/Wrapper-Component"))
const Loading = loadable(()=>import("../components/Loading-Component"))

export async function getStaticProps(){
  const faq = await faqFetcher(`/faq`)
  return { props: { faq } }
}

export default function Faq(props) {
  
  const [show, setShow] = useState('');

  const {resFAQ,loading} = useFAQ(props.faq);
  
  if(loading){
    return(
      <Wrapper title="Faq - SC Property" description="Page for show compact infomation answare and quetion SC Property">
        <Loading></Loading>
      </Wrapper>
    );
  }
  else{
    return(
    <Wrapper title="Faq - SC Property" description="Page for show compact infomation answare and quetion SC Property">
      <div className="flex justify-center">
        <span className="mt-7 font-bold text-3xl">FAQ</span>
      </div>
      <div className="w-full mt-10 mb-14 md:px-14 px-5">
      {resFAQ.map((data, index) => (
        <React.Fragment key={index}>
          <div onClick={()=>{if(show===data?.faq_id){setShow('')}else{setShow(data?.faq_id)}}}  className=" rounded-sm">
            <div className=" px-10 py-6 cursor-pointer bg-gray-50 mb-2">
              <button className="text-blue-500 hover:text-blue-700 focus:outline-none" type="button">
                {data?.question}
              </button>
            </div>
            {data?.faq_id===show?
              <div className="px-10 py-6 mb-10">
                <div className="text-gray-600 w-full text-justify" dangerouslySetInnerHTML={{__html:data?.answer}}/> 
              </div>
            :null
            }
          </div>
        </React.Fragment>
      ))}
      </div>
    </Wrapper>
    )
  }  
}
