"use client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { challengeOptions, challenges, courses, lessons, units } from '@/db/schema'
import { CheckCircle, CircleX, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import ChallengeOptionSForm from './challenges-form'
import Image from 'next/image'
import { useDeleteChallengeOptions } from '@/store/use-challenge-option-modal'

type Props = {
    units?: typeof units.$inferSelect[]
    lessons?: typeof lessons.$inferSelect[]
    courses?: typeof courses.$inferSelect[] | []
    challenges: typeof challenges.$inferInsert[]
    challengeOptions?: typeof challengeOptions.$inferSelect[]
}

const AllChallengeOptions = ({ units, lessons, courses, challenges, challengeOptions }: Props) => {

    const { open } = useDeleteChallengeOptions()

    return (
        <Command className="rounded-lg h-full w-full px-3 flex">
            <CommandInput placeholder='Search units' />
            <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup heading="Units">
                    <div className='pt-6 flex flex-col gap-4 w-full h-full'>
                        {
                            challenges.map((challenge) => {
                                const challengeOptionsForChallenge = challengeOptions && challengeOptions.filter((option) => option.challengeId === challenge.id);
                                const currentLesson = lessons?.find((lesson) => lesson.id == challenge.lessonId)
                                const currentUnit = units?.find((unit) => unit.id == currentLesson?.unitId)
                                const currentCourse = courses?.find((course) => course.id === currentUnit?.courseId)
                                if (challengeOptionsForChallenge && challengeOptionsForChallenge.length === 0) {
                                    return null
                                }
                                return (
                                    <CommandItem key={challenge.id} className=' border-2 rounded-xl flex flex-col items-center justify-center p-3 pb-6  relative'>
                                        <h1 className="text-neutral-700 text-start font-bold mt-3 text-lg lg:text-xl pb-2">{challenge.question}</h1>
                                        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
                                            {
                                                challengeOptionsForChallenge && challengeOptionsForChallenge.map((challengeOption) => (
                                                    <div key={challengeOption.id} className='flex items-center justify-center'>
                                                        <div className="border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] w-[180px] lg:w-[200px] relative">

                                                            <Image
                                                                src={challengeOption.imageSrc || "/mascot_sad.svg"}
                                                                width={93.33}
                                                                height={70}
                                                                alt={challengeOption.text}
                                                                className='rounded-lg drop-shadow-md border object-cover'
                                                            />
                                                            <p className="text-neutral-700 text-center font-bold mt-3">{challengeOption.text}</p>

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
                                                                                <ChallengeOptionSForm method='edit' challenges={challenges} challengeOption={challengeOption} />
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                className="bg-rose-100 cursor-pointer flex items-center sm:justify-start justify-center font-normal text-base" onClick={() => {
                                                                                    open(challengeOption.id)
                                                                                }}>
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuGroup>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </div>

                                                            <div className="absolute bottom-2 right-2">
                                                                {
                                                                    challengeOption.correct ? (
                                                                        <CheckCircle className='h-5 w-5 p-1 bg-sky-500 text-white shadow-xl rounded-xl cursor-default' />
                                                                    ) : (
                                                                        <CircleX className='h-5 w-5 p-1 bg-rose-500 text-white shadow-xl rounded-xl cursor-default' />
                                                                    )
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className="absolute bottom-2 right-3 flex items-center justify-around gap-2">
                                            <Badge className='cursor-pointer text-xs  bg-purple-600 hover:bg-purple-600 shadow-xl' >
                                                {currentCourse && currentCourse?.title}
                                            </Badge>
                                            <Badge className='cursor-pointer text-xs   bg-sky-400 hover:bg-sky-400' >
                                                {currentUnit?.title}
                                            </Badge>
                                            <Badge className='cursor-pointer text-xs  bg-violet-600 hover:bg-violet-600 shadow-xl' >
                                                {currentLesson?.title}
                                            </Badge>
                                        </div>
                                    </CommandItem>
                                );
                            })
                        }
                    </div>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}

export default AllChallengeOptions
