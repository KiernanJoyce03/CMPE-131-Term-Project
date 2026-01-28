import React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator
 } from '@/components/ui/dropdown-menu'

import tempPhoto from '../assets/person-icon.jpg'

function Header({style}) {
  return (
    <div className=" overflow-hidden border-b-2 border-gray-600 flex items-center justify-between" style={style}>
      <h1 className=" pl-2 text-white text-4xl ">
        My Book Tracker</h1>
        <DropdownMenu> 
          <DropdownMenuTrigger>
            <Button variant='ghost' className='p-0 mr-4'>
            <img src={tempPhoto} className="w-10 h-10 rounded-full hover:grayscale-100"></img>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel className='text-gray-500 text-[12px]'>My Account</DropdownMenuLabel>
              <DropdownMenuItem className=' focus:bg-gray-200'>Profile</DropdownMenuItem>
              <DropdownMenuItem className=' focus:bg-gray-200'>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className=' focus:bg-gray-200'>Books</DropdownMenuItem>
              <DropdownMenuItem className=' focus:bg-gray-200'>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
         </DropdownMenu>
        

        
      

    </div>
  )
}

export default Header