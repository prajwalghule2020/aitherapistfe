'use client'
import { Button } from "../ui/button"
import Link from "next/link"

interface SignInButtonProps {
    className?: string
}

export default function SignInButton({className}:SignInButtonProps){
   return(
     <Button asChild className={className}>
        <Link href="/login">Sign In</Link>
     </Button>
   );
}