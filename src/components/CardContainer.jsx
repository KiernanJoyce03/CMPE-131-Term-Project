import React from 'react'
import { useNavigate } from 'react-router-dom'

function CardContainer({ book }) {
  const thumbnail = book?.coverUrl
  const title = book?.title
  const navigate = useNavigate()

  return (

    <div
      onClick={() => navigate(`/home/book/${book.id.replace('/works/', '')}`)}
      className='relative w-full aspect-2/3 rounded-lg overflow-visible cursor-pointer
      transition-all duration-300 ease-out
      hover:-translate-y-2 hover:translate-x-1
      hover:scale-105
      hover:shadow-[4px_8px_24px_rgba(0,0,0,0.5)]
      hover:rotate-1'>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className='absolute inset-0 w-full h-full object-cover rounded-lg'
        />
      ) : (
        <div className='absolute inset-0 flex items-center justify-center bg-accent text-muted-foreground text-sm text-center px-2'>
          {title || 'No cover'}
        </div>
      )}
    </div>


  )
}

export default CardContainer