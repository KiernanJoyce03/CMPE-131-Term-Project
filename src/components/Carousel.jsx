import React from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
function Carousel({title}) {
  return (
    <div className=''>
        <h2 className='text-gray-100 pl-4'>{title}</h2>
        
        <div className='relative w-[95%] bg-blue-500 h-[200px] pl-4 overflow-x-auto '>
            <div className='absolute top-1/2 left-0'>  
                <button className=' text-gray-100 text-3xl'><FaArrowAltCircleLeft /></button>
            </div>
            <div className='absolute top-1/2 right-0'>  
                <button className=' text-gray-100 text-3xl'><FaArrowAltCircleRight /></button>
            </div>
            <div className='relative w-full min-w-0 overflow-hidden'>
                <div className=' flex gap-8 overflow-x-auto '>
                {[...Array(10)].map((_, index) => (
                    <div key={index} className='min-w-[120px] h-[160px] bg-gray-300 rounded-md '>
                        <p>{index}</p>
                    </div>
                ))}
                </div>
            </div>
           
                
         </div>
        
    </div>
    
  )
}

export default Carousel