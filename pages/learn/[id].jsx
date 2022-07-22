import React, { useEffect, useState }  from 'react';
import loadable from '@loadable/component'
 
import Loading from '../../components/Loading-Component'
import { FaRegClock } from 'react-icons/fa';
import { useArtikelDetail } from '../../api/get'

import {useStoreAuth} from '../../store/auth-store'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))
const Image = loadable(()=>import("../../components/ImageLazy-Component"))

export default function LearnDetail() {

  const {authStore} = useStoreAuth()

  const [slug, setSlug] = useState("");

  useEffect(()=>{
    if (typeof window === "undefined") return(<p></p>);
    const tmpSlug = window.location.href.split("/")[4]  
    setSlug(tmpSlug)  
  },[])
      
  const {loadingArtikelDetail, resArtikelDetail} = useArtikelDetail(slug)
 
    
  
  if( loadingArtikelDetail){
    return(
      <Wrapper title="Learn - SC Property" description="Page for show Learn SC Property">
        <Loading></Loading>
      </Wrapper>
    );
  }
  else{
    return(
      <Wrapper title="Learn - SC Property" description="Page for show Learn SC Property">
       
        <div className="w-full mt-10 mb-14 px-5 lg:px-32 xl:px-64">
          <div className="w-full flex flex-row flex-wrap">                        

            <div className="w-full flex flex-row flex-wrap">
              {                
                <figure className="bg-white">
                    
                  <div className="flex justify-center w-full">
                    <Image className="object-cover rounded w-full"  src={resArtikelDetail?.image} alt="Image Cover Artikel" />
                  </div>
                  
                  <div className="pt-6 left space-y-4 mb-10">
                    
                    <blockquote>
                      <p className="text-3xl font-semibold">
                        {resArtikelDetail?.title}
                      </p>
                      <div className="flex align-middle my-3">
                        <div>
                          <FaRegClock className='mt-2 mr-2'/> 
                        </div>
                        <div>
                          <p className="text-lg text-gray-700">Posting pada {resArtikelDetail?.created_at}</p> </div>
                        </div>
                      
                      <p className="text-base text-justify" dangerouslySetInnerHTML={{__html:resArtikelDetail?.content}}></p>

                    </blockquote>
                                                                
                  </div>
                </figure>                            
              }
            </div>

 
        </div>
      </div>
    </Wrapper>
    )
  }
}
