import React from 'react'

import Header from '../components/Header'

import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex-1 overflow-y-auto">
            <Outlet />
        </div>
        
    </div>
  )
}

export default MainLayout