import React from 'react'

function LandingPage() {
  return (
    <div className='bg-background text-foreground'>
        <div className=' tracking-tight flex items-center justify-between px-10 py-5 border-b border-white/[0.07] backdrop-blur-md bg-background/80 sticky top-0 z-100'>
            <span className='font-syne font-extrabold text-4xl tracking-tight bg-linear-to-br from-white to-accent bg-clip-text text-transparent'>
                Shelf Picks</span>
            <ul className='flex gap-6 text-sm text-foreground/50 cursor-pointer transition-colors duration-200 tracking-wide '>
                {["Home", "About", "Contact"].map((item) => (
                    <li key={item} className='hover:text-[#f0f0ff]'>{item}</li>
                ))}
            </ul>
            <button className='bg-accent text-foreground border-none px-5 py-2 rounded-full text-sm font-medium cursor-pointer trnasition-all duration-200 tracking-wide
            hover:-translate-y-px hover:shadow-[0_4px_20px_#6c63ff44]'>
                Get Started →
            </button>
        </div>
    </div>
  )
}

export default LandingPage