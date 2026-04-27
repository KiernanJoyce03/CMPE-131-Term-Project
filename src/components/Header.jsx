import React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { CiCloudMoon, CiCloudSun } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import tempPhoto from '../assets/person-icon.jpg'

import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../Redux/DarkMode/darkMode'
import { logout } from '../Redux/UserStatus/UserStatus'

import LoginPopup from './LoginPopup'
import SignupPopup from './SignupPopup'

function Header() {
  const dispatch = useDispatch()
  const darkModeState = useSelector((state) => state.darkMode.isDarkMode)
  const isLoggedIn = useSelector((state) => state.userStatus.isLoggedIn)

  const [loginOpen, setLoginOpen] = React.useState(false)
  const [signupOpen, setSignupOpen] = React.useState(false)

  return (
    <>
      <div className="grid grid-cols-3 items-center px-10 py-4 border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <h1 className="font-syne font-extrabold text-2xl tracking-tight">
          <Link to="/home" className="bg-linear-to-br from-white to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Shelf Picks
          </Link>
        </h1>

        <div className='flex items-center justify-center'>
          <input
            type='text'
            placeholder='Search books...'
            className='w-full max-w-sm bg-background/60 border border-border/110 rounded-full px-4 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent/50 transition-colors'
          />
        </div>

        <div className='justify-self-end pr-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='rounded-full hover:bg-transparent'>
                <Avatar size='lg'>
                  <AvatarImage src={tempPhoto} alt="User Profile Picture" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel className='text-muted-foreground text-[12px]'>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to='/profile' className='focus:bg-accent'>Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to=''>Books</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/profile/settings'>Settings</Link>
                </DropdownMenuItem>
                {isLoggedIn ? (
                  <DropdownMenuItem onSelect={() => dispatch(logout())}>
                    Log out
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem onSelect={() => setLoginOpen(true)}>
                      Log in
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSignupOpen(true)}>
                      Sign up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <div className='flex px-2 py-2 items-center gap-2'>
                <Switch checked={darkModeState} onCheckedChange={() => dispatch(toggleDarkMode())} />
                <Label className='text-xl'>{darkModeState ? <CiCloudSun /> : <CiCloudMoon />}</Label>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <LoginPopup open={loginOpen} onOpenChange={setLoginOpen} />
      <SignupPopup open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  )
}

export default Header
