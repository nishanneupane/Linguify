"use client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { challenges, courses, lessons, units } from '@/db/schema'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import ChallengeForm from './challenges-form'
import { useDeleteChallenge } from '@/store/user-delete-challenge'

type Props = {
    units?: typeof units.$inferSelect[]
    lessons: typeof lessons.$inferSelect[]
    courses?: typeof courses.$inferSelect[] | []
    challenges: typeof challenges.$inferInsert[]
}
const AllChallenge = ({ units, lessons, courses, challenges }: Props) => {

    const { open } = useDeleteChallenge()


    return (
        <Command className="rounded-lg h-full w-full px-3 flex">
            <CommandInput placeholder='Search units' />
            <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup heading="Units">
                    <div className='pt-6 flex flex-col gap-4 w-full h-full'>
                        {
                            challenges && challenges.map((challenge) => {
                                const currentLesson = lessons.find((lesson) => lesson.id === challenge.id)
                                const currentUnit = units && units.find((unit) => unit.id === currentLesson?.unitId)
                                const currentCourse=courses&&courses.find((course)=>course.id===currentUnit?.courseId)
                                return (
                                    <CommandItem key={challenge.id} className=' border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-center p-3 pb-6  relative'>
                                        <div className="absolute bottom-2 right-3 flex items-center justify-around gap-2">
                                            <Badge className='cursor-pointer text-xs   bg-sky-400 hover:bg-sky-400' >
                                                {currentUnit?.title}
                                            </Badge>
                                            <Badge className='cursor-pointer text-xs  bg-purple-600 hover:bg-purple-600 shadow-xl' >
                                                {currentCourse?.title}
                                            </Badge>
                                        </div>
                                        <h1 className="text-neutral-700 text-center font-bold mt-3 text-lg lg:text-xl">{challenge.question}</h1>

                                        <div className="absolute top-2 right-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <MoreHorizontal className='h-5 w-5 bg-transparent text-neutral-600' />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" side="left">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup className="flex flex-col gap-2">

                                                        <DropdownMenuItem className="bg-green-100 cursor-pointer" asChild>
                                                            <ChallengeForm method='edit' lessons={lessons} challenges={challenge} />
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="bg-rose-100 cursor-pointer flex items-center sm:justify-start justify-center font-normal text-base" onClick={() => {
                                                            open(challenge.id)
                                                        }}>
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className='absolute top-2 left-3'>
                                            <p className="text-muted-foreground">{currentLesson?.title}</p>
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

export default AllChallenge