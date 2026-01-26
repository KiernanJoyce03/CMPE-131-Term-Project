import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import MainContent from '../components/MainContent'

function Home() {

  return (
    <div className ="grid grid-cols-[200px_1fr] grid-rows-[60px_1fr] h-screen bg-gray-900 "
        style = {{gridTemplateAreas: `
            "header header"
            "sidebar main"
        `}}>

        <Header  style={{gridArea: "header"}} />
        <SideBar style={{gridArea: "sidebar"}} />
        <MainContent style={{gridArea: "main"}} />
        
    </div>
  )
}

export default Home