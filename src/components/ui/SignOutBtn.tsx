'use client'
import { Button } from "./button"
import { useAuthActions } from "@convex-dev/auth/react"

export const SignOutButton = ()=>{
  const { signOut } = useAuthActions()
  return <Button onClick={async()=> await void signOut()}>logout</Button>
}