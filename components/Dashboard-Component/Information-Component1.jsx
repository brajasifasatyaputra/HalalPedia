export default function Information({title, desc, size, link}){
  title = (title||"")
  desc = (desc || "")
  size = (size||3)
  link = (link||false)
  return(
    <div className="py-10 bg-white">
      <div className="w-full flex flex-row min-h-full py-10 bg-green-500">
        <div className="md:w-1/2 px-4 lg:px-16 py-10">
          <p className={`font-bold text-white text-${size}xl`}>
            {title}
          </p>
        </div>
        <div className="md:w-1/2 px-4 lg:px-16 py-10">
          <p className="text-white">
            {desc}
            {(link)?(
              <a className="ml-2 text-blue-600 font-bold" target="blank" href="https://www.cnbc.com/2019/10/01/real-estate-is-still-the-best-investment-you-can-make-today-millionaires-say.html">
                CBNC.com
              </a>
            ):null}
          </p>
        </div>
      </div>
    </div>
  )
}