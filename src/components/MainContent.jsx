import React from 'react'
import CarouselContainer from './CarouselContainer'


function MainContent({style}) {

  
  
  return (
    <div className='flex justify-center flex-col overflow-auto min-h-screen bg-background items-center' style={style}>
        
      <CarouselContainer/>
      <CarouselContainer/>
      <CarouselContainer/>
    </div>
  )
}

export default MainContent