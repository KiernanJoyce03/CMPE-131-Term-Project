import React, { useEffect } from 'react'
import CarouselContainer from './CarouselContainer'
import { Skeleton } from '@/components/ui/skeleton'

const sections = [
  { label: 'Popular Right Now', url: '/api/books/trending' },
  { label: 'Fantasy',           url: '/api/books/subject/fantasy' },
  { label: 'New Releases',      url: '/api/books/search?q=fiction&sort=new' },
]

function CarouselSkeleton() {
  return (
    <div className='flex gap-2 pt-4 w-[95%] mx-auto overflow-hidden'>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className='basis-1/6 shrink-0'>
          <Skeleton className='w-full aspect-2/3 rounded-lg' />
        </div>
      ))}
    </div>
  )
}

function MainContent() {
  const [sectionBooks, setSectionBooks] = React.useState({})
  const [loading, setLoading] = React.useState({})

  useEffect(() => {
    sections.forEach(async (section) => {
      setLoading((prev) => ({ ...prev, [section.label]: true }))
      try {
        const res = await fetch(section.url)
        const data = await res.json()
        setSectionBooks((prev) => ({ ...prev, [section.label]: data.books ?? [] }))
      } catch (err) {
        console.error(`Failed to fetch ${section.label}:`, err)
      } finally {
        setLoading((prev) => ({ ...prev, [section.label]: false }))
      }
    })
  }, [])

  return (
    <div className='flex flex-col bg-background px-10 py-10 gap-25'>
      {sections.map((section) => (
        <div key={section.label} className='flex flex-col pb-1'>
          <div className='flex items-center gap-3'>
            <span className='text-sm uppercase tracking-widest text-accent font-semibold'>
              {section.label}
            </span>
            <div className='flex-1 h-px bg-border/40' />
          </div>
          {loading[section.label]
            ? <CarouselSkeleton />
            : <CarouselContainer bookArray={sectionBooks[section.label] ?? []} />
          }
        </div>
      ))}
    </div>
  )
}

export default MainContent
