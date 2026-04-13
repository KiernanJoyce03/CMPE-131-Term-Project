import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarContainer from '../components/SidebarContainer.jsx'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.jsx';


function Profile() {
  // const [open,setOpen] = useState(true);


  return (
  <SidebarProvider  >
    <div className=" h-full min-h-screen flex w-full">
        

      
        <SidebarContainer />
        
      
      
      <SidebarInset className='min-h-0 flex-1 bg-background'>
        <main className='min-h-0 overflow-y-auto h-full' >

          
          <div className=''>
            <SidebarTrigger className=' text-gray-50 fixed top-4 left-[calc(var(--sidebar-width)+1rem)]
            z-50 transition-[left] duration-200 ease-in-out data-[collapsed=true]:left-[calc(var(--sidebar-width)+1rem)]'  />
          </div>
          
          <Outlet />
        </main>
      </SidebarInset>
      
    </div>
  </SidebarProvider>
  );

}

export default Profile