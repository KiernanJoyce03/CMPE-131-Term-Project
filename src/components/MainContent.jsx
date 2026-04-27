import React from 'react'
import { useEffect } from 'react'
import CarouselContainer from './CarouselContainer'

const sections = [
  { label: 'Popular Right Now', url: '/api/books/trending' },
  { label: 'Fantasy',           url: '/api/books/subject/fantasy' },
  { label: 'New Releases',      url: '/api/books/search?q=fiction&sort=new' },
]

function MainContent() {
  const [sectionBooks, setSectionBooks] = React.useState({})

  useEffect(() => {
    sections.forEach(async (section) => {
      try {
        const res = await fetch(section.url)
        const data = await res.json()
        setSectionBooks((prev) => ({ ...prev, [section.label]: data.books ?? [] }))
      } catch (err) {
        console.error(`Failed to fetch ${section.label}:`, err)
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
          <CarouselContainer bookArray={sectionBooks[section.label] ?? []} />
        </div>
      ))}
    </div>
  )
}

export default MainContent
