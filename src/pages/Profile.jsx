import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar.jsx/index.js'


function Profile() {



  return (
    <div className='grid grid-cols-[200px_1fr]' style = {{gridTemplateAreas: `
            "header header"
            "main main"
        `}} >
      <Sidebar style={{gridArea: "header"}} />
      <div style={{gridArea: "main"}}>
          <Outlet  />
      </div>
      
    </div>
  )
}

export default Profile