import React from 'react'
import CardContainer from './CardContainer'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"



function CarouselContainer({bookArray}) {

const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }))
  return (
    <div className='relative h-70 w-[95%] mx-auto'>
          <Carousel opts={{
          align: 'center',
          loop: true,
          slidesToScroll: 'auto',
        }} plugins={[plugin.current]} onMouseLeave={plugin.current.reset} onMouseEnter={plugin.current.stop}
        className='pt-4 w-full '>
          <CarouselContent className='-ml-2'>
            {(bookArray || []).map((book, index) => (
              <CarouselItem key={book.id ?? index} className='basis-1/3 md:basis-1/4 pl-2 lg:basis-1/6'>
                <CardContainer book={book}/>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          </Carousel>
        </div>
  )
}

export default CarouselContainer