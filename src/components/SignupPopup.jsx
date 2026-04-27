import React from 'react'

function SignupPopup() {
    return (
        <div>
            
                
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Welcome back</DialogTitle>
                    </DialogHeader>
                    <Label>Email</Label>
                    <Input type="email" />
                    <Label>Password</Label>
                    <Input type="password" />
                    <Button type="submit">Log in</Button>
                </DialogContent>
            
        </div>
    )
}

export default SignupPopup