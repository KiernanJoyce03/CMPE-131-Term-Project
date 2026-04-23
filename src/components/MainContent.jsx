import React from 'react'
import { useEffect } from 'react'
import CarouselContainer from './CarouselContainer'


function MainContent({style}) {
  const [books, setBooks] = React.useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/books/search?q=fiction')
      const data = await res.json()
      setBooks(data.items || [])
    }
    fetchBooks()
  }, [])

  return (
    <div className='flex flex-col bg-background items-center py-4 gap-6' style={style}>
        
      <CarouselContainer bookArray={books} />
      <CarouselContainer bookArray={books} />
      <CarouselContainer bookArray={books} />
    </div>
  )
}

export default MainContent