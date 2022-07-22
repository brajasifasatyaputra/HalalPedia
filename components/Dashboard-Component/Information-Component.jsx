export default function Information({title, desc, size, link}){
  title = (title||"")
  desc = (desc || "")
  size = (size||3)
  link = (link||false)
  return(
    <div className="py-10 bg-white">
      <div className="w-full min-h-full py-10 bg-green-500">
        <div className="px-4 lg:px-16 py-10">
          <p className={`font-bold text-white text-xl`}>
            {title}
          </p>
          <p className="text-white mt-5">
            {desc}
            {(link)?(
              <a className="ml-2 text-black font-bold" target="blank" href="https://www.cnbc.com/2019/10/01/real-estate-is-still-the-best-investment-you-can-make-today-millionaires-say.html">
                CBNC.com
              </a>
            ):null}
          </p>
        </div>
      </div>
    </div>
  )
}