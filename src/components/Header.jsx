import React from 'react'
import { Button } from '@/components/ui/button'
import {Avatar, AvatarImage} from '@/components/ui/avatar'
import { DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator
 } from '@/components/ui/dropdown-menu'

import tempPhoto from '../assets/person-icon.jpg'
import { Link } from 'react-router-dom'
import {Switch} from '@/components/ui/switch'
import {Label} from '@/components/ui/label'
import { CiCloudMoon, CiCloudSun } from "react-icons/ci";

function Header({style}) {
  const [darkMode, setDarkMode] = React.useState(false)


  return (
    <div className=" overflow-hidden border-b-2 border-gray-600 flex items-center justify-between" style={style}>
      <h1 className=" pl-2 text-white text-4xl ">
        <Link to="/" className=' hover:text-gray-400'>
        My Book Tracker </Link>
      </h1>
        <div className='pr-2 pt-2'>
          <DropdownMenu> 
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='rounded-full hover:bg-transparent '>
            <Avatar size='lg'>
              <AvatarImage src={tempPhoto} alt="User Profile Picture" />
            </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel className='text-gray-500 text-[12px]'>My Account</DropdownMenuLabel>
              <DropdownMenuItem  asChild>
                <Link to='/profile' className=' focus:bg-gray-200'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className=' focus:bg-gray-200'>
                <Link to=''>Billing</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className=' focus:bg-gray-200'>
                <Link to=''>Books</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className=' focus:bg-gray-200'>
                <Link to='/profile/settings'>Settings</Link>
              </DropdownMenuItem>
                <div className='flex px-1 py-2 item-center'>
                  <Switch checked ={darkMode} onCheckedChange ={()=>{setDarkMode(!darkMode)}} ></Switch>
                <Label className='pl-1 text-2xl'>{darkMode ? <CiCloudSun/> : <CiCloudMoon/> }</Label>
                </div>
                
              
              
            </DropdownMenuGroup>
          </DropdownMenuContent>
         </DropdownMenu>
        </div>
        
        

        
      

    </div>
  )
}

export default Header