import React from 'react'
import { Card, CardContent } from "@/components/ui/card"


function CardContainer({index}) {
  return (
    <div>
      <Card className='w-50 h-80'>
        <CardContent>
          {`Item ${index + 1}`}
        </CardContent>
      </Card>

    </div>
  )
}

export default CardContainer