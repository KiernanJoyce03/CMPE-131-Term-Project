import React from 'react'

function Header({style}) {
  return (
    <div className=" overflow-hidden border-b-2 border-gray-600 flex items-center" style={style}>
      <h1 className=" pl-2 text-white text-4xl ">
        My Book Tracker</h1>

    </div>
  )
}

export default Header