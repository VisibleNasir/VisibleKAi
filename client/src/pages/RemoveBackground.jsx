
import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react"
const RemoveBackground = () => {

   const onSubmitHandler =async()=>{
        e.preventDefault();
      }
      const [input , setInput] = useState('')


  return (
    <div className='h-full  w-full overflow-hidden flex-col overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left col */}
      <form onSubmit={onSubmitHandler} className=' max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#FF4938]'/>
            <h1 className='font-bold'>Background Removal</h1>
          </div>
          <p className='mt-6 text-s,m font-medium'>Upload image</p>

          <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='image/*' className='w-full p-2 px-3 outline-none text-sm rounded-md border border-gray-300 text-gray-600'  required />
         
          <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG, PNG, and other image format</p>

          <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
            <Eraser className='w-5'/>
            Remove Background
          </button>
      </form>
      {/* Right col */}
      <div className='w-full max-w-lg bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 '>
            <div className='flex items-center gap-3'>
              <Eraser className='w-5 h-5 text-[#FF4938]'/>
              <h1 className='text-xl font-semibold'>Processed Image</h1>

            </div>
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Eraser className='w-9 h-9'/>
                <p>Upload an image and click "Remove Background" to get started</p>

              </div>
            </div>
      </div>
    </div>
  )
}

export default RemoveBackground
