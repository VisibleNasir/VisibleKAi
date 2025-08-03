
import { PricingTable } from '@clerk/clerk-react'
const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Choose your Plan</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>Start your free ans scale up as you grow. Find the perfect plan for your content creation needs.</p>
      </div>
    <div className='mt-14'>
        <PricingTable/>
    </div>
    </div>
  )
}

export default Plan
