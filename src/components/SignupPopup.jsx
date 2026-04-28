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
import { useState } from 'react'

function SignupPopup({ open, onOpenChange }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (e) => {
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })
            const data = await res.json()
            console.log("Signup response:", data)
        } catch (err) {
            console.error("Failed to signup:", err)
        }
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-sm border border-white/[0.07] bg-background/95 backdrop-blur-md'>
                <DialogHeader>
                    <div className='inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1 text-[0.72rem] text-foreground/60 tracking-widest uppercase font-medium w-fit mb-1'>
                        <span className='w-1.5 h-1.5 rounded-full bg-accent' />
                        Shelf Picks
                    </div>
                    <DialogTitle className='font-syne text-2xl font-extrabold tracking-tight'>
                        Create an account
                    </DialogTitle>
                    <p className='text-sm text-foreground/50 font-dm-sans font-light'>
                        Start tracking your reads today — it's free
                    </p>
                </DialogHeader>

                <div className='flex flex-col gap-4 pt-1'>
                    <div className='flex flex-col gap-1.5'>
                        <Label htmlFor='signup-name' className='text-foreground/70 text-xs uppercase tracking-widest font-medium'>
                            Name
                        </Label>
                        <Input
                            id='signup-name'
                            type='text'
                            placeholder='Your name'
                            className='bg-background/60 border-white/10 placeholder:text-foreground/30 focus-visible:ring-accent/40 focus-visible:border-accent/50'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <Label htmlFor='signup-email' className='text-foreground/70 text-xs uppercase tracking-widest font-medium'>
                            Email
                        </Label>
                        <Input
                            id='signup-email'
                            type='email'
                            placeholder='you@example.com'
                            className='bg-background/60 border-white/10 placeholder:text-foreground/30 focus-visible:ring-accent/40 focus-visible:border-accent/50'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <Label htmlFor='signup-password' className='text-foreground/70 text-xs uppercase tracking-widest font-medium'>
                            Password
                        </Label>
                        <Input
                            id='signup-password'
                            type='password'
                            placeholder='••••••••'
                            className='bg-background/60 border-white/10 placeholder:text-foreground/30 focus-visible:ring-accent/40 focus-visible:border-accent/50'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        />
                    </div>
                    <Button
                        type='submit'
                        className='w-full bg-accent hover:bg-accent/90 text-white rounded-full tracking-wide hover:-translate-y-px hover:shadow-[0_4px_20px_#6c63ff44] transition-all duration-200'
                        onClick={onSubmit}                   
                   >
                        Create account →
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SignupPopup
