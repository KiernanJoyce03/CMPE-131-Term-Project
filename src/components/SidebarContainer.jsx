import React from 'react'
import { Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar'
import tempPhoto from '../assets/person-icon.jpg'
import { Avatar,
  AvatarImage,
 } from '@/components/ui/avatar'

import { CiHome, CiSettings } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function SidebarContainer() {
  return (
    <Sidebar side='left'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='hover:bg-accent h-12' asChild>
              <Link to='/profile'>
                <div className="flex items-center rounded-lg w-full">
                  <Avatar size='lg'>
                    <AvatarImage src={tempPhoto} alt="User Profile Picture" />
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none pl-2">
                    <span className="font-medium">Profile name</span>
                    <span className="text-muted-foreground text-sm">Student</span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className='px-2'>
          <SidebarMenuItem>
            <SidebarMenuButton className='hover:bg-accent' asChild>
              <Link to='/'>
                <span className='pr-3'><CiHome className='text-lg'/></span>
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className='hover:bg-accent' asChild>
              <Link to='/profile/settings'>
                <span className='pr-3'><CiSettings className='text-lg'/></span>
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className='hover:bg-accent' asChild>
              <Link to='/profile/books'>
                <span className='pr-3'><IoBookOutline className='text-lg'/></span>
                Books
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default SidebarContainer
