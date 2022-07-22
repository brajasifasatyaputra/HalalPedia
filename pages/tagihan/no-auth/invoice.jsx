import loadable from '@loadable/component' 
import { convertToRp } from '../../../helper/converter'
import { getPayment } from '../../../helper/localStorage'
const Wrapper = loadable(()=>import('../../../components/Wrapper-Component'))
const Image = loadable(()=>import('next/image'))
const Link = loadable(()=>import('next/link'))
export default function PaymentPage(){
  const data = JSON.parse(getPayment()) 
  return(
    <Wrapper title="Payment - Shariacoin" description="Shariacoin">   
     <div className='text-center'>
       <Image alt="Image" src={"/logo2.png"} width={100} height={100}></Image>
       <p className='font-bold text-lg'>SC Properti</p>
     </div> 
     <div className='w-full bg-white md:mb-5'>
     <div className='flex flex-row h-48 px-5 pt-3 bg-gray-200  md:mx-52  mx-5 rounded-lg justify-between'>
       <div className='text-sm '>
        <p className='mb-2'>No. ID</p>
        <p className='mb-2'>Bank </p>
       
        {data?.type==='WADIAH'?null:
        <>
          <p className='mb-2'>No. Rek</p> 
          <p className='mb-2'>Atas Nama</p>
          <p className='mb-2'>Expired</p> 
        </>
        }
         <p className='mb-2'>Total</p>
      </div> 
      <div className='text-sm text-right'>
       <p className='mb-2'>SCP-{data?.user_transaction_id}</p>
       <p className='mb-2'>{data?.type}</p>
       {data?.type==='WADIAH'?null:
        <>
        <p className='mb-2'>{data?.detail?.account}</p>
        <p className='mb-2'>{data?.detail?.name}</p>
        <p className='mb-2'>{data?.payment_expired}</p>
        </>
        }
         <p className='mb-2'>{convertToRp(data?.amount)}</p>
      </div>
     </div> 
     </div>
     {data?.type==='WADIAH'?null:
     <div className='md:mx-52 mx-5  mt-5'>
       <p className='text-red-500 text-sm ml-5 mt-5'>- Lakukan pembayaran sesuai dengan nominal dan rekening yang tertera di invoice.</p> 
        <p className='text-red-500 text-sm ml-5  '>- Perhatikan batas pembayaran anda, jangan sampai telat.</p> 
        <p className='text-red-500 text-sm ml-5  '>- Screen Shoot invoice ini untuk melakukan pembayaran.</p> 
     </div>
     }
     <div className='md:mx-52 mx-5 md:mb-10 mt-5'>
        <Link passHref href={"/"}>
          <button  class={` align-top bg-green-500 hover:bg-green-600 w-full text-white font-bold py-2 px-4 rounded`}>
            Kembali ke dashboard
          </button>
        </Link>
     </div>
    </Wrapper>
  )
}