import React from 'react'

function SideBarButtons({className, info}) {
  return (
    <div className='px-1'>
        <button className={className}>{info}</button>
    </div>
  )
}

export default SideBarButtons