import { Button } from '@/components/ui/button'
import { UserButton, SignedIn, SignedOut, ClerkLoading, ClerkLoaded, SignInButton } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const Header = () => {
    return (
        <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image
                        src={"logo-no-background.svg"}
                        width={50}
                        height={50}
                        alt='Logo'
                        className='object-contain'
                    />
                    <h1 className='md:block hidden text-2xl font-extrabold text-green-600 tracking-wide '>
                        Linguify
                    </h1>
                </div>
                <div className="flex items-center justify-center">
                    <ClerkLoading>
                        <Loader2 className='text-muted-foreground h-5 w-5 animate-spin' />
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignedIn>
                            <UserButton afterSignOutUrl='/' />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton
                                mode='modal'
                                afterSignInUrl='/learn'
                                afterSignUpUrl='/learn'
                            >
                                <Button size={"lg"} variant={"ghost"}>
                                    Login
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </ClerkLoaded>
                </div>
            </div>
        </header>
    )
}