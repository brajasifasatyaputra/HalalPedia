import loadable from '@loadable/component'
import { useFollower } from '../api/get';
 
  
const Select = loadable(()=>import('react-select'))
const Loading = loadable(()=>import("../components/Loading-Component"))
const Wrapper = loadable(()=>import("../components/Wrapper-Component"))

export default function Gadai() {  

  const {resFollower,loading} = useFollower();  

  if (loading) {
    return (
      <Wrapper title="List Referral - SC Property" description="Page for show list follower user SC Property">
        <Loading></Loading>
      </Wrapper>
    )
  }

  else {
    return (
      <Wrapper title="Referral - SC Property" description="Page for show list follower user SC Property">
        
        <div className="flex flex-col px-5 md:px-14">

          <div className="mt-8 mb-10">
            <div className="">                
              <h3 className="text-3xl font-semibold">List Referral</h3>                
              <p className="mt-1 text-sm text-gray-800">
                Page ini akan menampilkan pengguna referral mu
              </p>                                                                                         
            </div>
          </div>
 
          
          <div className="inline-block overflow-x-auto bg-white">
            {(resFollower?.length === 0)?(
              <div className="w-full flex justify-center text-center text-4xl mt-5">Belum ada yang menggunakan referral mu</div>
            ):(
              <>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-t-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">No</th>
                    <th className="px-6 py-3 border-b-2 border-t-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Email</th>

                  </tr>
                 
                </thead>
                <tbody className="bg-white">
                  {
                    resFollower?.map((data, index) => (

                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm leading-5 text-gray-800">{index+1}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"> {data.email_registered}</td>

                      </tr>
                    ))
                  }
                </tbody>
              </table>
       
              </>
            )}
            
          </div>
        </div>
      </Wrapper>
    )
  }
}
