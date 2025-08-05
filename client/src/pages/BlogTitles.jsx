
import {  Hash, Sparkles } from 'lucide-react'
import  { useState } from 'react'
const BlogTitles = () => {

  const blodCategories = ['General' , 'Technology' ,'Business' , 'Health' ,'Lifestyle' , 'Education' ,'Travel' ,'Food']

    const [selectedCategory ,setSelectedCategory] = useState('General')
    const onSubmitHandler =async()=>{
      e.preventDefault();
    }
    const [input , setInput] = useState('')

  return (
    <div className='h-full  w-full overflow-hidden flex-col overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left col */}
      <form onSubmit={onSubmitHandler} className=' max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#8E37EB]'/>
            <h1 className='font-bold'>AI Title Generation</h1>
          </div>
          <p className='mt-6 text-s,m font-medium'>Keyword</p>

          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe your blog title here...' required />

          <p className='mt-3 text-sm font-medium '>Category</p>
          <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
            {blodCategories.map((item)=>(
              <span onClick={()=>{
                setSelectedCategory(item)
              }} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item? 'bg-purple-50 text-purple-700':'text-gray-500 border-gray-300'} `} key={item}>{item}</span>
            ))}
          </div>
          <br />
          <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
            <Hash className='w-5'/>
            Generate Title
          </button>
      </form>
      {/* Right col */}
      <div className='w-full max-w-lg bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 '>
            <div className='flex items-center gap-3'>
              <Hash className='w-5 h-5 text-[#8E37EB]'/>
              <h1 className='text-xl font-semibold'>Generated titles</h1>

            </div>
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Hash className='w-9 h-9'/>
                <p>Enter a topic and click "Generate Title" to get started</p>

              </div>
            </div>
      </div>
    </div>
  )
}

export default BlogTitles
