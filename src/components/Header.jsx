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

import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../Redux/DarkMode/darkMode'


function Header() {
  

  const dispatch = useDispatch();
  const darkModeState = useSelector((state) => state.darkMode.isDarkMode);


  return (
    <div className=" overflow-hidden border-b-2 border-border flex items-center justify-between bg-background">
      <h1 className=" pl-2 text-foreground text-4xl ">
        <Link to="/" className=' hover:text-muted-foreground'>
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
              <DropdownMenuLabel className='text-muted-foreground text-[12px]'>My Account</DropdownMenuLabel>
              <DropdownMenuItem  asChild>
                <Link to='/profile' className=' focus:bg-accent'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className=' focus:bg-accent'>
                <Link to=''>Billing</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className=' focus:bg-accent'>
                <Link to=''>Books</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className=' focus:bg-accent'>
                <Link to='/profile/settings'>Settings</Link>
              </DropdownMenuItem>
                <div className='flex px-1 py-2 items-center'>
                  <Switch checked ={darkModeState} onCheckedChange ={()=>{dispatch(toggleDarkMode())}} ></Switch>
                <Label className='pl-1 text-2xl'>{darkModeState    ? <CiCloudSun/> : <CiCloudMoon/> }</Label>
                </div>
                
              
              
            </DropdownMenuGroup>
          </DropdownMenuContent>
         </DropdownMenu>
        </div>
        
        

        
      

    </div>
  )
}

export default Header