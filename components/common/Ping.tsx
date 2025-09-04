
const Ping = () => {
  return (
    <div className="">
        <div className="absolute size-3 flex justify-center items-center -top-2 -right-2 text-white/80 font-semibold">
            <span className="flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-blue-500"></span>
            </span>
        </div>
    </div>
  )
}



export default Ping