import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function LoginPopup({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 pt-2'>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='you@example.com' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' placeholder='••••••••' />
          </div>
          <Button type='submit' className='w-full'>Log in</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginPopup
