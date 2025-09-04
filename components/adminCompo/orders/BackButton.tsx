"use client";

import { ArrowLeft } from "lucide-react";

const BackButton = () => {

  return (
    <div onClick={() => history.back()} className="flex items-center w-fit space-x-3 font-semibold text-black/60">
        <ArrowLeft size={20}/>
        <button className="cursor-pointer">Back</button>
    </div>
  )
}

export default BackButton