import React from 'react'
import { features } from './features'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='bg-background text-foreground min-h-screen overflow-y-auto'>

      {/* Header */}
      <div className='tracking-tight grid grid-cols-3 items-center px-10 py-5 border-b border-white/[0.07] backdrop-blur-md bg-background/80 sticky top-0 z-100'>
        <span className='font-syne font-extrabold text-4xl tracking-tight bg-linear-to-br from-white to-accent bg-clip-text text-transparent'>
          Shelf Picks
        </span>
        <ul className='flex gap-6 justify-center text-sm text-foreground/50 transition-colors duration-200 tracking-wide'>
          {[{ label: "Home", path: "/home" }, { label: "About", path: "/about" }, { label: "Contact", path: "/contact" }].map((item) => (
            <li key={item.label}>
              <Link to={item.path} className='hover:text-[#f0f0ff]'>{item.label}</Link>
            </li>
          ))}
        </ul>
        <button className='justify-self-end bg-accent text-foreground border-none px-5 py-2 rounded-full text-sm font-medium cursor-pointer duration-200 tracking-wide hover:-translate-y-px hover:shadow-[0_4px_20px_#6c63ff44]'>
          Get Started →
        </button>
      </div>
          
    {/* Hero Section */}
    <div className='pt-[100px] px-10 pb-20 max-w-[900px] mx-auto text-center relative'>
        <div className='inline-flex items-center gap-2 bg-accent/10 border border-accent/30
        rounded-full px-4 py-1.5 text-[0.78rem] text-foreground/70 tracking-[0.04em] font-medium mb-7 uppercase'>
            <span className='w-1.5 h-1.5 rounded-full bg-[#00d4aa] shadow-[0_0_8px_#00d4aa] animate-pulse'/>
            Now in public beta
        </div>
        <h1 className='font-syne text-5xl font-extrabold tracking-tight mb-5 bg-linear-to-b from-white to-white/50 bg-clip-text text-transparent'>
          Track every book.<br/>Remember every story.
        </h1>
        <p className='text-foreground/50 text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto font-dm-sans'>
          The book tracker built for readers who care — shelf your reads, write reviews, and discover what to read next.
        </p>
        <button className='bg-accent text-white px-7 py-3 rounded-full text-sm font-medium tracking-wide duration-200 hover:-translate-y-px hover:shadow-[0_4px_24px_#6c63ff66]'>
          Start Tracking Free →
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