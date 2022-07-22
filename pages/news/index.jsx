import loadable from '@loadable/component'
import { useNewsEvent,useEvent } from '../../api/get'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))
const Loading = loadable(()=>import("../../components/Loading-Component"))

export default function Learn() {

  const {loadingNews, results} = useNewsEvent('',0,0)
  const {loadingEvents, resultsEvent} = useEvent('',0,0)
   
  if(loadingNews||loadingEvents ){
    return(
      <Wrapper title="News & Event - SC Property" description="Page for show News & Event SC Property">
        <Loading></Loading>
      </Wrapper>
    );
  }
  else{
    return(
      <Wrapper title="News & Event - SC Property" description="Page for show News & Event SC Property">
       
        <section  className=' bg-gray-100'>
          <div className="md:px-14 px-5 md:py-16 pb-20 pt-10">
            <p className='text-4xl font-bold'>Event Sosialisasi dan Kegiatan</p>
            <p className="md:pt-3 pt-10 lead text-gray-500 text-xl">Kegiatan dan sosialisasi yang dilakukan SC Property kepada masyarakat.</p>          
          </div>
        </section>

        <div className="bg-white md:px-14 px-5 py-10">
          <h4 className="text-2xl font-bold">Our Event</h4> 
          <div className=" md:hidden block">     
          <table width="100%" className="table table-striped" >
            <tbody>
            {resultsEvent? 
              resultsEvent?.map((item, index) => ( 
              <div className='border rounded-lg mt-5' key={index} >
              <tr>
                <td className="border-b-2 border-gray-100   py-5 pl-5">No.</td>
                <td className="border-b-2 border-gray-100 py-5 pl-5">{index+1}</td>
              </tr>
              <tr>
                <td className="border-b-2 border-gray-100   py-5 pl-5">Tanggal Event</td>
                <td className="border-b-2 border-gray-100 py-5 pl-5">{(item?.created_at)}</td>
              </tr>
              <tr>
                <td className="border-b-2 border-gray-100   py-5 pl-5">Event</td>
                <td className="border-b-2 border-gray-100 py-5 pl-5">{item?.title}</td>
              </tr>
              <tr>
                <td className="border-b-2 border-gray-100   py-5 pl-5">Link</td>
                <td className="border-b-2 border-gray-100 py-5 pl-5">
                  <a target="blank" href={item?.link}>
                    <button type="button" className="text-blue-400">Link</button>                  
                  </a>
                </td>
              </tr>
              </div>
             ))
             :
             <div></div>          
             } 
            </tbody>
          </table>
          </div>
          <div className=" md:block hidden">       
          <table width="100%" className="table table-striped" >
            <thead>
              <tr >
                <th className="border-t-2 py-5 pl-5">No.</th>
                <th  className="border-t-2 py-5 pl-5">Tanggal Event</th>
                <th  className="border-t-2 py-5 pl-5">Event</th>
                <th  className="border-t-2 py-5 pl-5 pr-10">Link</th>                
              </tr>
            </thead>
            <tbody>
            {resultsEvent? 
              resultsEvent?.map((item, index) => (
              <tr  key={index} >
                <td   className={`${index%2===0?`bg-gray-200`:`bg-white`} pl-5 py-5`} >{index+1}</td>
                <td className={`${index%2===0?`bg-gray-200`:`bg-white`} pl-5 py-5`} >{(item?.created_at)}</td>
                <td  className={`${index%2===0?`bg-gray-200`:`bg-white`} pl-5 py-5`}>{item?.title}</td>
                <td  className={`${index%2===0?`bg-gray-200`:`bg-white`} pl-5 pr-10 py-5`}>
                  <a target="blank" href={item?.link}>
                    <button type="button" className="text-blue-400">Link</button>                  
                  </a>
                </td>                
              </tr>
               ))
              :
              <div></div>          
              }   
            </tbody>
          </table>
          </div>
          <div style={{height:100}}/>
          <h4 className="text-2xl font-bold">Our News</h4>   
          <div className=" md:hidden block">     
          <table width="100%" className="table table-striped" >
            <tbody>
            {results? 
            results?.map((item, index) => ( 
              <div className='border rounded-lg mt-5' key={index}>
              <tr>
                <td className="border-b-2 border-gray-100   py-5 pl-5">No.</td>
                <td className="border-b-2 border-gray-100 py-5 pl-5">{index+1}</td>
              </tr>
              <tr>
                <td className="border-b-2 border-gray-100   py-5 pl-5">Tanggal News</td>
                <td className="border-b-2 border-gray-100 py-5 pl-5">{(item?.created_at)}</td>
              </tr>
              <tr>
                <td className="border-b-2 border-gray-100   py-5 pl-5">News</td>
                <td className="border-b-2 border-gray-100 py-5 pl-5">{item?.title}</td>
              </tr>
              <tr>
                <td className="border-b-2 border-gray-100   py-5 pl-5">Link</td>
                <td className="border-b-2 border-gray-100 py-5 pl-5">
                  <a target="blank" href={item?.link}>
                    <button type="button" className="text-blue-400">Link</button>                  
                  </a>
                </td>
              </tr>
              </div>
             ))
             :
             <div></div>          
             } 
            </tbody>
          </table>
          </div>
          <div className=" md:block hidden">  
          <table width="100%" className="table table-striped">
            <thead>
              <tr >
                <th className="border-t-2 py-5 pl-5"  >No.</th>
                <th className="border-t-2 py-5 pl-5" >Tanggal News</th>
                <th className="border-t-2 py-5 pl-5" >News</th>
                <th className="border-t-2 py-5 pl-5 pr-10" >Link</th>                
              </tr>
            </thead>
            <tbody>
            {results? 
            results?.map((item, index) => (
              <tr key={index} >
                <td className={`${index%2===0?`bg-gray-200`:`bg-white`} pl-5 py-5`}>{index+1}</td>
                <td className={`${index%2===0?`bg-gray-200`:`bg-white`} pl-5 py-5`} >{(item?.created_at)}</td>
                <td className={`${index%2===0?`bg-gray-200`:`bg-white`} pl-5 py-5`}>{item?.title}</td>
                <td className={`${index%2===0?`bg-gray-200`:`bg-white`} pl-5 pr-10 py-5`}>
                  <a target="blank" href={item?.link}>
                    <button type="button"  className="text-blue-400">Link</button>                  
                  </a>
                </td>                
              </tr>
               ))
              :
              <div></div>          
              }   
            </tbody>
          </table>
          </div>
          </div>  
        
    </Wrapper>
    )
  }  
}
