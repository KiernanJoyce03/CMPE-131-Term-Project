import React from 'react'
import Carousel from './Carousel'

function MainContent({style}) {
  return (
    <div className='min-w-0' style={style}>
        <Carousel title={"Top Books"}/>
    </div>
  )
}

export default MainContent