export default function DownloadComponent(){
  return(
    <div className="w-full bg-gray-100">
      <div className="md:px-14 px-5 py-10">
        <p className="text-2xl font-semibold text-gray-800">Download Whitepaper</p>
        <p className="text-gray-800">The whitepaper describes the SC-Property system. It provides an explanation for the need of tokenized real estate, as well as the specifics of how SC-Property has been built.</p>
        <button className="bg-green-500 text-white px-20 mt-10 rounded py-2 hover:bg-green-600" onClick={()=>window.open("https://properti.shariacoin.co.id:7901/documents/whitepaper_srec.pdf") }>Download</button>
      </div>
    </div>    
  )
}