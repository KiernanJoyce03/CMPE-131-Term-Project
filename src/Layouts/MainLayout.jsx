import React from 'react'

import Header from '../components/Header'

import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className ="grid grid-cols-[200px_1fr] grid-rows-[60px_1fr] min-h-screen bg-gray-900 "
        style = {{gridTemplateAreas: `
            "header header"
            "main main"
        `}}>

        <Header  style={{gridArea: "header"}} />
        <div style={{gridArea: "main"}}>
            <Outlet  />
        </div>
        
    </div>
  )
}

export default MainLayout