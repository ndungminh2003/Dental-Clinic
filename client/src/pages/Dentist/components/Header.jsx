import React from 'react'
import UserDropdown from './UserDropdown';
export default function Header (){
  return (
    <div className ="w-full h-20  border-b	border-zinc-300 ">
        <div className ="w-full h-full flex items-center justify-end pl-5 pr-10">
          <UserDropdown/>
        </div>
    </div>
  )
}

