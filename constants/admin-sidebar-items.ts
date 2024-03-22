"use client"

import { BookCheck, Folder, ListCollapse, School, Swords, User2, Ratio } from "lucide-react"


export const adminSidebarItems = [
    {
        id: 1,
        name: "Courses",
        icon: School,
        href: "/admin/courses"
    },
    {
        id: 2,
        name: "Units",
        icon: ListCollapse,
        href: "/admin/units"
    },
    {
        id: 3,
        name: "Lessons",
        icon: BookCheck,
        href: "/admin/lessons"
    },
    {
        id: 4,
        name: "Challenges",
        icon: Swords,
        href: "/admin/challenges"
    },
    {
        id: 5,
        name: "Options",
        icon: Ratio,
        href: "/admin/challengeOptions"
    },
    {
        id: 6,
        name: "Profile",
        icon: User2,
        href: "/admin/profile"
    },
    {
        id: 7,
        name: "Media",
        icon: Folder,
        href: "/admin/media"
    },
]