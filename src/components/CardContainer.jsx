import React from 'react'
import { Card, CardContent } from "@/components/ui/card"


function CardContainer({ book }) {
  const thumbnail = book?.volumeInfo?.imageLinks?.thumbnail
    ?.replace('http://', 'https://')
    ?.replace('zoom=1', 'zoom=2')
  const title = book?.volumeInfo?.title

  return (
    <div>
      <Card className='w-50 h-80 overflow-hidden'>
        <CardContent className='p-0 h-full'>
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-accent text-muted-foreground text-sm text-center px-2'>
              {title || 'No cover'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CardContainer