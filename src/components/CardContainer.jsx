import React from 'react'

function CardContainer({ book }) {
  const thumbnail = book?.volumeInfo?.imageLinks?.thumbnail
    ?.replace('http://', 'https://')
    ?.replace('zoom=1', 'zoom=2')
  const title = book?.volumeInfo?.title

  return (
    <div className='relative w-full aspect-2/3 rounded-lg overflow-hidden'>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className='absolute inset-0 w-full h-full object-cover'
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