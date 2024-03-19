import FeedWrapper from '@/components/feed-wrapper'
import Promo from '@/components/promo'
import StickyWrapper from '@/components/sticky-wrapper'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import UserProgress from '@/components/user-progress'
import { getUserProgress, getUserSubscription } from '@/db/queries'
import { quests } from '@/lib/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
    title: "Quests"
}

const QuestsPage = async () => {
    const userProgressData = getUserProgress()
    const userSubscriptionData = getUserSubscription()

    const [userProgress, userSubscription] = await Promise.all(
        [
            userProgressData,
            userSubscriptionData,
        ]
    )

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }
    const isPro = !!userSubscription?.isActive
    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
                {
                    !isPro && (
                        <Promo />
                    )
                }
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src={"/quests.svg"}
                        alt='Quests'
                        height={90}
                        width={90}
                    />
                    <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>Quests</h1>
                    <p className='text-muted-foreground text-center text-lg mb-6'>
                        Complete quests by earning points.
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full" />

                    <ul className="w-full flex flex-col gap-3">
                        {
                            quests.map((quest) => {
                                const progress = (userProgress.points / quest.value) * 100

                                return (
                                    <div
                                        key={quest.title}
                                        className='flex items-center w-full gap-4 gap-x-4'
                                    >
                                        <Image
                                            src={"/points.svg"}
                                            alt='Points'
                                            width={60}
                                            height={60}
                                        />
                                        <div className="flex flex-col gap-y-2 w-full">
                                            <p className='text-neutral-700 text-xl font-bold'>{quest.title}</p>
                                            <Progress
                                                value={progress}
                                                className='h-3'
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    )
}

export default QuestsPage