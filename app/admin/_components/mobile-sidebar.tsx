import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Sidebar from './sidebar'

const AdminMobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='h-5 w-5 text-white' />
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0 z-[100]">
                <Sidebar />
            </SheetContent>

        </Sheet>
    )
}

export default AdminMobileSidebar