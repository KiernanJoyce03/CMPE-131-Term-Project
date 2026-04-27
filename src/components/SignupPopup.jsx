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

function SignupPopup({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 pt-2'>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='signup-name'>Name</Label>
            <Input id='signup-name' type='text' placeholder='Your name' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='signup-email'>Email</Label>
            <Input id='signup-email' type='email' placeholder='you@example.com' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='signup-password'>Password</Label>
            <Input id='signup-password' type='password' placeholder='••••••••' />
          </div>
          <Button type='submit' className='w-full'>Create account</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SignupPopup
