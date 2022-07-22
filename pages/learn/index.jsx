import loadable from '@loadable/component'
import {useNews} from '../../api/get'

const Wrapper = loadable(()=>import("../../components/Wrapper-Component"))
const Loading = loadable(()=>import('../../components/Loading-Component'))
const Link = loadable(()=>import('next/link'))

export default function Learn() {
  
  const {loadingNews, results} = useNews('learn',4,0,0)
       
  if(loadingNews ){
    return(
      <Wrapper title="Learn - SC Property" description="Page for show Learn SC Property">
        <Loading></Loading>
      </Wrapper>
    );
  }
  else{
    return(
      <Wrapper title="Learn - SC Property" description="Page for show Learn SC Property">
       
        <section  className=' bg-gray-100'>
          <div className="container md:px-14 px-5 md:py-16 pt-10 pb-20">
            <p className='text-4xl font-bold'>Learn About SC Property</p>
            <p className="md:pt-3 pt-10 lead text-gray-500 text-xl">Anda kurang familiar dengan blockchain, kripto dan tokenisasi? Hal ini sangat mudah untuk dipelajari karena ada teknologi blockchain. Bersama SC Property Anda lebih mudah mengelola dan belajar memiliki properti di blockchain.</p>          
          </div>
        </section>

        <div className="md:px-14 px-5 py-5 md:py-10 bg-white">
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">

            {results?.map((data, index)=>(
              <div className="w-full" key={index}>
                <p className="text-2xl font-semibold pb-2">{data?.title}</p>
                <p className="pb-3">
                  {data?.featured_text}
                </p>
              <Link href={`/learn/${data?.slugs}`}>
                <button type="button" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  >Read More</button>          
              </Link>
              </div>
            ))}
            
          </div>

          <div className="pt-16 pb-10">
            <div  >
              <h3 className="pb-2 text-2xl font-semibold">Download Whitepaper</h3>
              <p className="pb-3">
                The whitepaper describes the SC-Property system. It provides an explanation for the need of tokenized real estate, as well as the specifics of how SC-Property has been built.
              </p>  
              <button type="button" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>window.open("https://properti.shariacoin.co.id:7901/documents/whitepaper_srec.pdf") }  >Download Whitepaper</button>
            </div>
          </div>
        </div>
    </Wrapper>
    )
  }  
}
