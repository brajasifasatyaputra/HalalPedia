import React from 'react';
import loadable from '@loadable/component'

import {useTermCondition, termConditionFetcher} from '../api/get';

const Wrapper = loadable(()=>import("../components/Wrapper-Component"))
const Loading = loadable(()=>import("../components/Loading-Component"));

export async function getStaticProps(){
  const term = await termConditionFetcher(`/termCondition`)
  return { props: { term } }
}

export default function Term(props) {

  const {resTermCondition,loading} = useTermCondition(props.term); 
 
  if(loading){
    return(
      <Wrapper title="Term Condition - SC Property" description="Page for show compact infomation answare and quetion SC Property">    
        <Loading></Loading>
      </Wrapper>
    );
  }
  else{
    return (        
      <Wrapper title="Term Condition - SC Property" description="Page for show compact infomation answare and quetion SC Property">    
        <div className="w-full my-4 text-justify md:px-14 px-5">              
          <div className="mb-10" dangerouslySetInnerHTML={{__html:resTermCondition[0]?.term}}/>
          <div dangerouslySetInnerHTML={{__html:resTermCondition[0]?.privacy}}/>         
        </div> 
      </Wrapper>          
    )
  }

}
