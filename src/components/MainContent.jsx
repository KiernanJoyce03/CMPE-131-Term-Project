import React from 'react'
import { useEffect } from 'react'
import CarouselContainer from './CarouselContainer'


function MainContent({style}) {
  const [books, setBooks] = React.useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/books/search?q=fiction')
      console.log('status:', res.status)
      const text = await res.text()
      console.log('raw response:', text)
      try {
        const data = JSON.parse(text)
        setBooks(data.items || [])
      } catch (e) {
        console.error('JSON parse failed:', e)
      }
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