import React from 'react'
import CarouselContainer from './CarouselContainer'


function MainContent({style}) {

  
  
  return (
    <div className='flex justify-center' style={style}>
        
      <CarouselContainer/>
      {/* <CarouselContainer/> */}
    </div>
  )
}

export default MainContent