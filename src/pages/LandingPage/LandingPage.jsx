import React from 'react'
import { features } from './features'
import { Card, CardContent } from '@/components/ui/card'

function LandingPage() {
  return (
    <div className='bg-background text-foreground min-h-screen overflow-y-auto'>

      {/* Header */}
      <div className='tracking-tight grid grid-cols-3 items-center px-10 py-5 border-b border-white/[0.07] backdrop-blur-md bg-background/80 sticky top-0 z-100'>
        <span className='font-syne font-extrabold text-4xl tracking-tight bg-linear-to-br from-white to-accent bg-clip-text text-transparent'>
          Shelf Picks
        </span>
        <ul className='flex gap-6 justify-center text-sm text-foreground/50 cursor-pointer transition-colors duration-200 tracking-wide'>
          {["Home", "About", "Contact"].map((item) => (
            <li key={item} className='hover:text-[#f0f0ff]'>{item}</li>
          ))}
        </ul>
        <button className='justify-self-end bg-accent text-foreground border-none px-5 py-2 rounded-full text-sm font-medium cursor-pointer duration-200 tracking-wide hover:-translate-y-px hover:shadow-[0_4px_20px_#6c63ff44]'>
          Get Started →
        </button>
      </div>

      {/* Features */}
      <div className='px-10 py-20 max-w-6xl mx-auto flex flex-col items-center text-center'>
        <div className='text-xs uppercase tracking-widest text-accent font-semibold mb-0'>
          FEATURES
        </div>
        <div className='font-syne text-4xl font-bold tracking-[-0.02em] mb-6'>
          Letterboxd for books
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
          {features.map((feature) => (
            <Card key={feature.title} className='p-5 flex flex-col gap-4'>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${feature.color}`}>
                {feature.emoji}
              </div>
              <CardContent className='p-0'>
                <div className='font-syne text-base font-bold mb-2 tracking-tight'>{feature.title}</div>
                <div className='text-sm text-foreground/50 leading-relaxed font-light'>{feature.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}

export default LandingPage