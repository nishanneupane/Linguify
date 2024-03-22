"use client"
import { adminSidebarItems } from '@/constants/admin-sidebar-items'
import React from 'react'
import SidebarItem from './sidebar-item'

const SidebarItems = () => {
  return (
    <div className="flex flex-col gap-y-2 flex-1">
      {
        adminSidebarItems.map((item) => (
          <SidebarItem
            key={item.name}
            label={item.name}
            href={item.href}
            iconSrc={item.icon}
          />
        ))
      }
    </div>
  )
}

export default SidebarItems