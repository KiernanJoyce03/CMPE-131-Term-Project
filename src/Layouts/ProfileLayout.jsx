import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarContainer from '../components/SidebarContainer.jsx'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.jsx';
import { Sidebar } from 'lucide-react';


function Profile() {
  // const [open,setOpen] = useState(true);


  return (
  <SidebarProvider  >
    <div className=" h-full min-h-screen flex w-full">
        

      
        <SidebarContainer />
        
      
      
      <SidebarInset className='min-h-0 flex-1 bg-gray-900'>
        <main className='min-h-0 overflow-y-auto' >
          <div className=''>
            <SidebarTrigger className="-ml-1 text-gray-50" />
          </div>
          
          <Outlet />
        </main>
      </SidebarInset>
      
    </div>
  </SidebarProvider>
  );

}

export default Profile