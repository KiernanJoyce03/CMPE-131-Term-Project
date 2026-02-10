import React from 'react'
import { Sidebar,
  SidebarContent,
  SidebarGroup,
  useSidebar,
  SidebarProvider, 
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarMenuBadge,
} from '@/components/ui/sidebar'
import tempPhoto from '../assets/person-icon.jpg'
import { Avatar,
  AvatarImage,
 } from '@/components/ui/avatar'

import { CiHome, CiSettings } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { GalleryVerticalEnd } from 'lucide-react';
import { Link } from 'react-router-dom';





function SidebarContainer() {
  return (
    <div>
      <Sidebar side='left'>
        <SidebarHeader >
          <SidebarMenu >
            <SidebarMenuButton className='hover:bg-gray-200 h-12' asChild >

              <Link to='/profile' >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex  items-center  rounded-lg  w-full ">
                  <Avatar size='lg'>
                    <AvatarImage src={tempPhoto} alt="User Profile Picture" />
                  </Avatar>
                
                  <div className="flex flex-col gap-0.5 leading-none pl-2">
                    <span className="font-medium">Profile name</span>
                    <span className="">Student</span>
                  </div>
                </div>
              </Link>
              
            </SidebarMenuButton>
          </SidebarMenu>
         
       </SidebarHeader>
      
        <SidebarContent className='' >
            <SidebarMenu className='px-2'>
              <SidebarMenuButton className='hover:bg-gray-300' asChild>
                <Link to='/' >
                  <SidebarMenuBadge className='pr-3' >
                  <CiHome className='text-lg'/>
                </SidebarMenuBadge>
                Home
                </Link>
              </SidebarMenuButton>
              
              <SidebarMenuButton className='hover:bg-gray-300' asChild>
                <Link to='/profile/settings'>
                  <SidebarMenuBadge className='pr-3'>
                    <CiSettings className='text-lg'/>
                  </SidebarMenuBadge>
                  Settings
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton className='hover:bg-gray-300' asChild>
                <Link to='/profile/books'>
                  <SidebarMenuBadge className='pr-3.75'>
                    <IoBookOutline className='text-md'/>
                  </SidebarMenuBadge>
                  Books
                </Link>
              </SidebarMenuButton>
              
            </SidebarMenu>
        </SidebarContent>

      </Sidebar>
      
       
        
      
        
    </div>
  )
}

export default SidebarContainer