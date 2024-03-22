import React from 'react'
import MobileHeader from './_components/mobile-header'
import AdminSidebar from './_components/sidebar'
import { isAdmin } from '@/lib/admin'
import { redirect } from 'next/navigation'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    if (!isAdmin()) {
        redirect("/")
    }
    return (
        <>
            <MobileHeader />
            <AdminSidebar className='hidden lg:flex' />
            <main className='lg:pl-[256px] h-full pt-[50px] lg:pt-0'>
                <div className="max-w-[1056px] mx-auto pt-6 h-full">
                    {children}
                </div>
            </main>
        </>
    )
}

export default AdminLayout