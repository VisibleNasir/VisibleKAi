import { Sparkles } from 'lucide-react'
import React from 'react'

const WriteArticle = () => {
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left col */}
      <form className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#4A7AFF]'/>
            <h1 className='font-bold'>Article Configuration</h1>
          </div>
          <p className='mt-6 text-s,m font-medium'>Article Topic</p>

          <input type="text" className='w-full p-2 px-3 outline-none text-sm rounded-md border border-gray-300' placeholder='future of artificial intelligence is...' required />

          <p className='mt-3 text-sm font-medium '>Article Length</p>
      </form>
      {/* Right col */}
      <div>

      </div>
    </div>
  )
}

export default WriteArticle
