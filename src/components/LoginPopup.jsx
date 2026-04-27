import React from 'react'

function LoginPopup() {
  return (
    <div>
        <Dialog>
  <DialogTrigger asChild>
    <Button>Log in</Button>
  </DialogTrigger>
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
</Dialog>
    </div>
  )
}

export default LoginPopup