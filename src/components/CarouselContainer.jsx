import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"



function CarouselContainer() {

const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))
  return (
    <div className='h-90 w-[80%]'>
          <Carousel opts={{
          align: 'start',
          loop: true,
          slidesToscroll: 'auto',
        }} plugins={[plugin.current]} onMouseLeave={plugin.current.reset} onMouseEnter={plugin.current.stop}
        className='pt-4 w-full '>
          <CarouselContent className='gap-1'>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className='basis-1/2 pl-0 lg:basis-1/5'>
                <div className=''>
                  <Card className='w-50 h-80'>
                    <CardContent>
                      {`Item ${index + 1}`}
                    </CardContent>
                  </Card>
                </div>
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