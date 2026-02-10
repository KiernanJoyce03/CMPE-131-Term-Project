import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar,AvatarImage } from '@/components/ui/avatar'
import tempPhoto from '../../assets/person-icon.jpg'
import { Button } from '@/components/ui/button'


function Details() {
  return (
    <div className='flex flex-col  h-full w-full bg-amber-800'>

      
      <div className='flex justify-center '>
        <Card className='w-[90%] h-32 flex'>
          <CardContent >
            <div>
              <Button size='icon' variant='' className=' rounded-full' >
              <Avatar  className='hover:border-2 h-20 w-20' >
                <AvatarImage src={tempPhoto} alt="User Profile Picture" />
              </Avatar>
            </Button>
            </div>
            <p>Change Profile Picture</p>
            
          </CardContent>
        </Card>
      </div>
      
      
    </div>
  )
}

export default Details