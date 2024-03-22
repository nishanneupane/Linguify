"use client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { courses, lessons, units } from '@/db/schema'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import LessonForm from './lesson-form'
import { useDeleteLesson } from '@/store/use-delete-lesson-modal'
import { Badge } from '@/components/ui/badge'

type Props = {
    units: typeof units.$inferSelect[]
    lessons: typeof lessons.$inferSelect[]
    courses?: typeof courses.$inferSelect[] | []
}
const AllLesson = ({ units, lessons, courses }: Props) => {

    const { open } = useDeleteLesson()


    return (
        <Command className="rounded-lg h-full w-full px-3 flex">
            <CommandInput placeholder='Search units' />
            <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup heading="Units">
                    <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 w-full h-full'>
                        {
                            lessons.map((lesson) => {
                                const currentUnit = units.find((unit) => unit.id === lesson.unitId)
                                const currentCourse = courses&&courses.find((course) => course.id === currentUnit?.courseId)
                                return (
                                    <CommandItem key={lesson.id} className=' border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-center p-3 pb-6 min-h-[217px] w-[180px] lg:w-[200px] relative'>
                                        <Badge className='cursor-pointer text-xs absolute top-2 right-3 bg-sky-400 hover:bg-sky-400' >
                                            {currentCourse?.title}
                                        </Badge>
                                        <h1 className="text-neutral-700 text-center font-bold mt-3 text-lg lg:text-xl">{lesson.title}</h1>

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
                                                            <LessonForm method='edit' units={units} lessons={lesson} />
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="bg-rose-100 cursor-pointer flex items-center sm:justify-start justify-center font-normal text-base" onClick={() => {
                                                            open(lesson.id)
                                                        }}>
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className='absolute bottom-2 left-3'>
                                            <p className="text-muted-foreground">{currentUnit?.title}</p>
                                        </div>
                                    </CommandItem>
                                )
                            })
                        }
                    </div>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}

export default AllLesson