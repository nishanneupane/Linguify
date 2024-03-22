"use client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { courses } from '@/db/schema'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CoursesForm from './course-form'
import { useDeleteModal } from '@/store/use-delete-modal'

type Props = {
    courses: typeof courses.$inferSelect[]
}
const AllCourse = ({ courses }: Props) => {

    const {open}=useDeleteModal()
    
    return (
        <Command className="rounded-lg h-full w-full px-3">
            <CommandInput placeholder='Search for course' />
            <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup heading="Courses">
                    <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 w-full'>
                        {
                            courses.map((course) => (
                                <CommandItem key={course.id} className=' border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] w-[180px] lg:w-[200px] relative'>
                                    <Image
                                        src={course.imageSrc}
                                        width={93.33}
                                        height={70}
                                        alt={course.title}
                                        className='rounded-lg drop-shadow-md border object-cover'
                                    />
                                    <p className="text-neutral-700 text-center font-bold mt-3">{course.title}</p>

                                    <div className="absolute bottom-2 right-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <MoreHorizontal className='h-5 w-5 bg-transparent text-neutral-600' />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" side="top">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup className="flex flex-col gap-2">

                                                    <DropdownMenuItem className="bg-green-100 cursor-pointer" asChild>
                                                        <CoursesForm method='edit' courses={course} />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="bg-rose-100 cursor-pointer flex items-center sm:justify-start justify-center font-normal text-base" onClick={()=>{
                                                        open(course.id)
                                                    }}>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CommandItem>
                            ))
                        }
                    </div>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}

export default AllCourse