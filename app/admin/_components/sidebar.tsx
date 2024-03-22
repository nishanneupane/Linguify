import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import SidebarItem from './sidebar-item'
import { adminSidebarItems } from '@/constants/admin-sidebar-items'
import { Loader } from 'lucide-react'
import SidebarItems from './sidebar-items'

type Props = {
    className?: string
}

const AdminSidebar = ({ className }: Props) => {

    return (
        <div className={
            cn(
                'lg:w-[256px] lg:fixed left-0 top-0 h-full flex px-4 border-r-2 flex-col',
                className
            )
        }>
            <Link href={"/learn"}>
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image
                        src={"/mascot.svg"}
                        width={40}
                        height={40}
                        alt='Logo'
                        className='object-contain'
                    />
                    <h1 className='text-2xl font-extrabold text-sky-600 tracking-wide'>
                        Linguify
                    </h1>
                </div>
            </Link>

            <SidebarItems />

            <div className="p-4">
                <ClerkLoading>
                    <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl='/' />
                </ClerkLoaded>
            </div>
        </div>
    )
}

export default AdminSidebar