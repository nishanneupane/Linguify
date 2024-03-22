"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

type Props = {
    label: string;
    iconSrc: LucideIcon;
    href: string;
}

const SidebarItem = ({ href, iconSrc:Icon, label }: Props) => {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Button
            variant={isActive ? "sidebarOutline" : "sidebar"}
            className='justify-start h-[52px]' 
            asChild
        >
            <Link href={href}>
                <Icon
                    className='mr-5 shadow-lg text-sky-500 p-2 rounded-xl'
                    height={38}
                    width={38}
                />
                {label}
            </Link>
        </Button>
    )
}

export default SidebarItem