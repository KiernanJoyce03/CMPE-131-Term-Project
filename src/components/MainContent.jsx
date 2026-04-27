import React from 'react'
import { useEffect } from 'react'
import CarouselContainer from './CarouselContainer'


function MainContent() {
  const [books, setBooks] = React.useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/books/search?q=fiction')
      const data = await res.json()
      setBooks(data.items || [])
    }
    fetchBooks()
  }, [])

  const sections = [
    { label: 'Popular Right Now', query: 'fiction' },
    { label: 'Top Rated', query: 'bestseller' },
    { label: 'New Releases', query: 'new releases 2024' },
  ]

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
          <CarouselContainer bookArray={books} />
        </div>
      ))}
    </div>
  )
}

export default MainContent