import React from 'react'
import CarouselContainer from './CarouselContainer'


function MainContent({style}) {

  
  
  return (
    <div className='flex flex-col bg-background items-center py-4 gap-6' style={style}>
        
      <CarouselContainer/>
      <CarouselContainer/>
      <CarouselContainer/>
    </div>
  )
}

export default MainContent