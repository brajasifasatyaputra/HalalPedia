import React from 'react'
import Link from 'next/link'

export default function ReviewComponent(){
  return(
    <div className="flex min-h-screen">
      <div className="m-auto">
        <div className="text-3xl text-center font-thin mb-5">
          <span>Kelengkapan profile kamu dalam tahap review mohon tunggu yaa :)</span>
        </div>
        <div className="flex justify-center">
          <Link passHref href="/">
            <button className="bg-green-400 py-3 px-6 outline-none hover:bg-green-500 font-semibold text-white rounded">Back to home</button>
          </Link>
        </div>
      </div>
    </div>
  )
}