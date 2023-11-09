import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function Header (){
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

  return (
    <div {...bindTrigger(popupState)} className ="w-full h-20  border-b	border-zinc-300 ">
        <div className ="w-full h-full flex items-center justify-end pl-5 pr-10">
          <div className =" flex border-[2px] border-Topaz rounded pl-5 pr-2 py-1 ">
            <div>
              <h1 className ="text-xs">Hello, Khanh</h1>
              <h1 className ="text-sm font-medium">Dentist</h1>
            </div>
            <div className ="ml-2">
              <ArrowDropDownIcon/>
            </div>
            <Menu
              {...bindMenu(popupState)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem onClick={popupState.close}>Cake</MenuItem>
              <MenuItem onClick={popupState.close}>Death</MenuItem>
            </Menu>
          </div>
        </div>
    </div>
  )
}

