import React from 'react'
import SideBarButtons from './SideBarButtons'

function SideBar({style}) {
  return (
    <div className='overflow-hidden pt-2 bg-gray-700' style={style} >
      <SideBarButtons 
        className="hover:bg-gray-600 rounded-sm  w-full py-1" 
        info={"Home"}  />
      <SideBarButtons 
        className="hover:bg-gray-600 rounded-sm w-full py-1" 
        info={"Profile"}  />

    </div>
  )
}

export default SideBar